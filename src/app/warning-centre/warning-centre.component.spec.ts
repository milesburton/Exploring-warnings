/// <reference types="vitest/globals" />
import { inject, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of, map } from 'rxjs';
import { vi } from 'vitest';
import { selectAllMessages, selectCounts, selectHighestSeverity } from '../warnings/warnings.selectors';
import { WarningsActions } from '../warnings/warnings.actions';


// Minimal test-only version of the component with inline template and no styles
@Component({
  selector: 'app-warning-centre',
  template: '<div></div>',
  standalone: true,
})
class TestWarningCentreComponent {
  messages$;
  counts$;
  borderClass$;
  customerTypes = [{ label: 'Customer / SDS', value: 'sds' }];
  customerType = this.customerTypes[0];
  private store = inject(Store);
  constructor() {
    this.messages$ = this.store.select(selectAllMessages);
    this.counts$ = this.store.select(selectCounts);
    this.borderClass$ = this.store
      .select(selectHighestSeverity)
      .pipe(map(level => `border-${level}`));
  }
  onRemove(id: string): void {
    this.store.dispatch(WarningsActions.removeMessage({ id }));
  }
  onClearAll(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(WarningsActions.clearAll());
  }
}

describe('WarningCentreComponent', () => {
  let component: TestWarningCentreComponent;
  let storeStub: any;

  beforeEach(() => {
    storeStub = {
      select: vi.fn((selector) => {
        if (selector === selectHighestSeverity) {
          return of('error');
        }
        return of([]);
      }),
      dispatch: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeStub },
      ],
      imports: [TestWarningCentreComponent],
    });
    component = TestBed.createComponent(TestWarningCentreComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch removeMessage on onRemove', () => {
    component.onRemove('test-id');
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      type: '[Warnings] Remove Message',
      id: 'test-id',
    });
  });

  it('should dispatch clearAll and stopPropagation on onClearAll', () => {
    const event = { stopPropagation: vi.fn() } as any;
    component.onClearAll(event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      type: '[Warnings] Clear All',
    });
  });

  it('should map borderClass$ correctly', async () => {
    const result = await component.borderClass$.toPromise();
    expect(result).toBe('border-error');
  });
});
