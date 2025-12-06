import { warningsReducer, initialState } from './warnings.reducer';
import { WarningsActions } from './warnings.actions';

describe('warningsReducer extra coverage', () => {
  it('should not remove message if id not found', () => {
    const state = warningsReducer(initialState, WarningsActions.removeMessage({ id: 'not-found' }));
    expect(state.messages.length).toBe(initialState.messages.length);
  });

  it('should clear all messages', () => {
    const state = warningsReducer(initialState, WarningsActions.clearAll());
    expect(state.messages.length).toBe(0);
  });
});
