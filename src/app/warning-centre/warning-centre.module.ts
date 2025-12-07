import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { WarningCentreComponent } from './warning-centre.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    PopoverModule,
    DropdownModule,
    TagModule,
    TooltipModule,
    WarningCentreComponent,
  ],
  exports: [WarningCentreComponent],
})
export class WarningCentreModule {}
