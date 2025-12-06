/// <reference types="vitest/globals" />
import { of } from 'rxjs';
import { WarningCentreComponent } from './warning-centre.component';
import { vi } from 'vitest';
import { selectHighestSeverity } from '../warnings/warnings.selectors';

describe('WarningCentreComponent', () => {
  let component: WarningCentreComponent;

  beforeEach(() => {
    // Provide a minimal store stub: select returns observables used by the component
    const storeStub: any = {
      select: () => of([]),
      dispatch: () => {},
    };

    component = new WarningCentreComponent(storeStub);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch removeMessage on onRemove', () => {
    const storeStub: any = {
      select: () => of([]),
      dispatch: vi.fn(),
    };
    const comp = new WarningCentreComponent(storeStub);
    comp.onRemove('test-id');
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      type: '[Warnings] Remove Message',
      id: 'test-id',
    });
  });

  it('should dispatch clearAll and stopPropagation on onClearAll', () => {
    const storeStub: any = {
      select: () => of([]),
      dispatch: vi.fn(),
    };
    const comp = new WarningCentreComponent(storeStub);
    const event = { stopPropagation: vi.fn() } as any;
    comp.onClearAll(event);
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(storeStub.dispatch).toHaveBeenCalledWith({
      type: '[Warnings] Clear All',
    });
  });

  it('should map borderClass$ correctly', async () => {
    // selectHighestSeverity returns 'error', 'warning', etc.
    const storeStub: any = {
      select: vi.fn((selector) => {
        if (selector === selectHighestSeverity) {
          return of('error');
        }
        return of([]);
      }),
      dispatch: vi.fn(),
    };
    const comp = new WarningCentreComponent(storeStub);
    const result = await comp.borderClass$.toPromise();
    expect(result).toBe('border-error');
  });
});
