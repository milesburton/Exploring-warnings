/// <reference types="vitest/globals" />
import { WarningsActions } from './warnings.actions';

describe('WarningsActions', () => {
  it('should create Add Message action', () => {
    const action = WarningsActions.addMessage({ message: { id: '1', text: 'Test', severity: 'error' } });
    expect(action.type).toBe('[Warnings] Add Message');
    expect(action.message).toEqual({ id: '1', text: 'Test', severity: 'error' });
  });

  it('should create Remove Message action', () => {
    const action = WarningsActions.removeMessage({ id: '1' });
    expect(action.type).toBe('[Warnings] Remove Message');
    expect(action.id).toBe('1');
  });

  it('should create Clear All action', () => {
    const action = WarningsActions.clearAll();
    expect(action.type).toBe('[Warnings] Clear All');
    // No payload for clearAll
    expect(Object.keys(action)).toEqual(['type']);
  });
});