import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { WarningCentreComponent } from './warning-centre.component';
import { WarningCentreModule } from './warning-centre.module';
import { warningsReducer, warningsFeatureKey } from '../warnings/warnings.reducer';

describe('WarningCentreComponent', () => {
  let fixture: ComponentFixture<WarningCentreComponent>;
  let component: WarningCentreComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        WarningCentreModule,
        StoreModule.forRoot({
          [warningsFeatureKey]: warningsReducer,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WarningCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
