import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { WarningsActions } from '../warnings/warnings.actions';
import { WarningMessage } from '../warnings/warning-message.model';
import {
  selectAllMessages,
  selectCounts,
  selectHighestSeverity,
} from '../warnings/warnings.selectors';

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
    PopoverModule,
    DropdownModule,
    TagModule,
    TooltipModule
],
})
export class WarningCentreComponent implements OnInit, OnDestroy {
  messages$: Observable<WarningMessage[]>;

  private autoDismissTimers: Map<string, any> = new Map();

  private protectedIds: Set<string> = new Set();

  private fadingIds: Set<string> = new Set();

  private destroy$ = new Subject<void>();

  private messagesSub?: any;

  counts$: Observable<{ error: number; warning: number; info: number; total: number }>;

  borderClass$: Observable<string>;

  customerTypes = [{ label: 'Trainer / Pokémon', value: 'pokemon' }];

  customerType = this.customerTypes[0];

  // Manual test panel state (excluded from visual tests)
  newMessageText = '';

  newMessageLevel: WarningMessage['level'] = 'error';

  levels: WarningMessage['level'][] = ['error', 'warning', 'info'];

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
          if (
            msg.autoDismiss &&
            !this.autoDismissTimers.has(msg.id) &&
            !this.protectedIds.has(msg.id)
          ) {
            const timer = setTimeout(() => {
              if (this.protectedIds.has(msg.id)) {
                this.autoDismissTimers.delete(msg.id);
                return;
              }
              this.fadingIds.add(msg.id);
              setTimeout(() => {
                this.onRemove(msg.id);
                this.fadingIds.delete(msg.id);
                this.autoDismissTimers.delete(msg.id);
              }, 200);
            }, 15000);
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

  onItemMouseEnter(id: string): void {
    const t = this.autoDismissTimers.get(id);
    if (t) {
      clearTimeout(t);
      this.autoDismissTimers.delete(id);
    }
    this.protectedIds.add(id);
  }

  onItemMouseLeave(id: string): void {
    // Do not reschedule auto-dismiss automatically; user interacted.
  }

  onItemClick(id: string): void {
    this.protectedIds.add(id);
  }

  isFading(id: string): boolean {
    return this.fadingIds.has(id);
  }

  addManualMessage(): void {
    const text = (this.newMessageText || '').trim();
    if (!text) return;
    const id = `manual-${Date.now()}`;
    const level = this.newMessageLevel;
    this.store.dispatch(
      WarningsActions.addMessage({ message: { id, level, text, autoDismiss: false } })
    );
    this.newMessageText = '';
  }
}
