import { createActionGroup, props } from '@ngrx/store';
import { WarningMessage } from './warning-message.model';

export const WarningsActions = createActionGroup({
  source: 'Warnings',
  events: {
    'Add Message': props<{ message: WarningMessage }>(),
    'Remove Message': props<{ id: string }>(),
    'Clear All': props<{}>(),
  },
});
