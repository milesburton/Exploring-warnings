import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { WarningMessage } from '../warnings/warning-message.model';
import {
  selectAllMessages,
  selectCounts,
  selectHighestSeverity,
} from '../warnings/warnings.selectors';
import { WarningsActions } from '../warnings/warnings.actions';

@Component({
  selector: 'app-warning-centre',
  templateUrl: './warning-centre.component.html',
  styleUrls: ['./warning-centre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningCentreComponent {
  messages$: Observable<WarningMessage[]> =
    this.store.select(selectAllMessages);
  counts$ = this.store.select(selectCounts);

  borderClass$ = this.store.select(selectHighestSeverity).pipe(
    map(level => `border-${level}`),
  );

  customerTypes = [{ label: 'Customer / SDS', value: 'sds' }];
  customerType = this.customerTypes[0];

  constructor(private store: Store) {}

  onRemove(id: string): void {
    this.store.dispatch(WarningsActions.removeMessage({ id }));
  }

  onClearAll(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(WarningsActions.clearAll());
  }
}
