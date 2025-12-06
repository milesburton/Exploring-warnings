import { of } from 'rxjs';
import { WarningCentreComponent } from './warning-centre.component';

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
});
