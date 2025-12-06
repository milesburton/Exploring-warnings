import { createActionGroup, emptyProps } from '@ngrx/store';
import { WarningMessage } from './warning-message.model';

export const WarningsActions = createActionGroup({
  source: 'Warnings',
  events: {
    'Add Message': (props: { message: WarningMessage }) => ({ message: props.message }),
    'Remove Message': (props: { id: string }) => ({ id: props.id }),
    'Clear All': emptyProps(),
  },
});
