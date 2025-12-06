import { createReducer, on } from '@ngrx/store';
import { WarningsActions } from './warnings.actions';
import { WarningMessage } from './warning-message.model';

export interface WarningsState {
  messages: WarningMessage[];
}

export const warningsFeatureKey = 'warnings';

const seededMessages: WarningMessage[] = [
  {
    id: 'customer-not-found',
    level: 'error',
    text:
      'User profile could not be loaded. Please check your connection or try again later.',
    autoDismiss: false,
  },
  {
    id: 'notional-too-low',
    level: 'error',
    text: 'Notional Amount too low.',
    autoDismiss: true,
  },
  {
    id: 'kyc-warning',
    level: 'warning',
    text: 'KYC documents are incomplete.',
    autoDismiss: true,
  },
  {
    id: 'info-market-open',
    level: 'info',
    text: 'Market is now open.',
    autoDismiss: true,
  },
];

export const initialState: WarningsState = {
  messages: seededMessages,
};

export const warningsReducer = createReducer(
  initialState,
  on(WarningsActions.addMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(WarningsActions.removeMessage, (state, { id }) => ({
    ...state,
    messages: state.messages.filter(m => m.id !== id),
  })),
  on(WarningsActions.clearAll, state => ({
    ...state,
    messages: [],
  })),
);
