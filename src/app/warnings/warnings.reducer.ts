import { createReducer, on } from '@ngrx/store';
import { WarningsActions } from './warnings.actions';
import { WarningMessage } from './warning-message.model';

export interface WarningsState {
  messages: WarningMessage[];
}

export const warningsFeatureKey = 'warnings';

const seededMessages: WarningMessage[] = [
  {
    id: 'pikachu-missing',
    level: 'error',
    text:
      'Pikachu is missing from the Pokédex. Please check your connection to Professor Oak.',
    autoDismiss: false,
  },
  {
    id: 'charmander-training',
    level: 'error',
    text: 'Charmander needs more training.',
    autoDismiss: true,
  },
  {
    id: 'bulbasaur-registration',
    level: 'warning',
    text: 'Bulbasaur has not completed gym registration.',
    autoDismiss: true,
  },
  {
    id: 'league-open',
    level: 'info',
    text: 'The Pokémon League is now open.',
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
