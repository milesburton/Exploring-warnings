import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { WarningsActions } from '../warnings/warnings.actions';
import {
  selectAllMessages,
  selectCounts,
  selectHighestSeverity,
} from '../warnings/warnings.selectors';
import { WarningMessage } from '../warnings/warning-message.model';

@Component({
  selector: 'app-warning-centre',
  templateUrl: './warning-centre.component.html',
  styleUrls: ['./warning-centre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    OverlayPanelModule,
    DropdownModule,
  ],
})
export class WarningCentreComponent {
  messages$: Observable<WarningMessage[]>;
  counts$: Observable<{ error: number; warning: number; info: number; total: number }>;

  borderClass$: Observable<string>;

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
