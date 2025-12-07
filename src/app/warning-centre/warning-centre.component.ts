import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, Subject, takeUntil } from 'rxjs';

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
export class WarningCentreComponent implements OnInit, OnDestroy {
  messages$: Observable<WarningMessage[]>;
  private autoDismissTimers: Map<string, any> = new Map();
  private destroy$ = new Subject<void>();
  private messagesSub?: any;
  counts$: Observable<{ error: number; warning: number; info: number; total: number }>;

  borderClass$: Observable<string>;

  customerTypes = [{ label: 'Trainer / Pokémon', value: 'pokemon' }];
  customerType = this.customerTypes[0];


  private store = inject(Store);


  constructor() {
    this.messages$ = this.store.select(selectAllMessages);
    this.counts$ = this.store.select(selectCounts);
    this.borderClass$ = this.store
      .select(selectHighestSeverity)
      .pipe(map(level => `border-${level}`));
  }

  ngOnInit(): void {
    this.messagesSub = this.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {

        messages.forEach(msg => {
          if (msg.autoDismiss && !this.autoDismissTimers.has(msg.id)) {
            const timer = setTimeout(() => {
              this.onRemove(msg.id);
              this.autoDismissTimers.delete(msg.id);
            }, 5000);
            this.autoDismissTimers.set(msg.id, timer);
          }
        });

        Array.from(this.autoDismissTimers.keys()).forEach(id => {
          if (!messages.find(m => m.id === id)) {
            clearTimeout(this.autoDismissTimers.get(id));
            this.autoDismissTimers.delete(id);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.messagesSub) {
      this.messagesSub.unsubscribe();
    }

    this.autoDismissTimers.forEach(timer => clearTimeout(timer));
    this.autoDismissTimers.clear();
  }

  onRemove(id: string): void {
    this.store.dispatch(WarningsActions.removeMessage({ id }));
  }

  onClearAll(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(WarningsActions.clearAll());
  }
}
