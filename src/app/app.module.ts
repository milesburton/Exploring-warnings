import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { WarningCentreModule } from './warning-centre/warning-centre.module';
import { warningsReducer, warningsFeatureKey } from './warnings/warnings.reducer';

@NgModule({
  // Standalone components go in imports, not declarations
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      [warningsFeatureKey]: warningsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    AppComponent,
    WarningCentreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
