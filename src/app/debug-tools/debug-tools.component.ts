import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { APP_VERSION, APP_BUILD_DATE } from '../../version';
import { WarningsActions } from '../warnings/warnings.actions';

@Component({
  selector: 'app-debug-tools',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './debug-tools.component.html',
  styleUrls: ['./debug-tools.component.scss'],
})
export class DebugToolsComponent {
  version = APP_VERSION;

  buildDate = new Date(APP_BUILD_DATE);

  levels: Array<'error' | 'warning' | 'info'> = ['error', 'warning', 'info'];

  newMessageText = '';

  newMessageLevel: 'error' | 'warning' | 'info' = 'info';

  private store = inject(Store);

  addManualMessage() {
    const text = this.newMessageText?.trim();
    if (!text) return;
    const id = Math.random().toString(36).slice(2, 9);
    this.store.dispatch(
      WarningsActions.addMessage({
        message: { id, text, level: this.newMessageLevel },
      })
    );
    this.newMessageText = '';
  }
}
