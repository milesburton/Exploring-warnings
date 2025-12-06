/// <reference types="vitest/globals" />
import { of } from 'rxjs';
import { WarningCentreComponent } from './warning-centre.component';
import { vi } from 'vitest';

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
});
