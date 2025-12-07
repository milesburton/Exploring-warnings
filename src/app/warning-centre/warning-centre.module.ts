import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

import { WarningCentreComponent } from './warning-centre.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    OverlayPanelModule,
    DropdownModule,
    TagModule,
    WarningCentreComponent,
  ],
  exports: [WarningCentreComponent],
})
export class WarningCentreModule {}
