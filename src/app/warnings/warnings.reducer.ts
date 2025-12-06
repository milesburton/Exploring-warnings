import { createReducer, on } from '@ngrx/store';
import { WarningsActions } from './warnings.actions';
import { WarningMessage } from './warning-message.model';

export interface WarningsState {
  messages: WarningMessage[];
}

export const warningsFeatureKey = 'warnings';

const seededMessages: WarningMessage[] = [
  {
    id: 'sds-customer-not-found',
    level: 'error',
    text:
      'SDS Customer not found – the full error can be much longer i.e. Lorem ipsum dolor sit amet, ' +
      'consectetur adipiscing elit. Quisque id nunc bibendum dolor finibus laoreet. Vivamus volutpat ' +
      'nulla quis pellentesque semper. Duis ac nibh elementum, euismod vel velit non, varius magna. ' +
      'Proin tortor ipsum, iaculis at efficitur efficitur, egestas ac odio. Etiam tristique sollicitudin nisl sit amet auctor.',
  },
  {
    id: 'notional-too-low',
    level: 'error',
    text: 'Notional Amount too low.',
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
