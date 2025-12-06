/// <reference types="vitest/globals" />
import { describe, it, expect } from 'vitest';
import { warningsReducer, initialState } from './warnings.reducer';
import { WarningsActions } from './warnings.actions';

describe('warningsReducer', () => {
  it('should clear all messages when Clear All is dispatched', () => {
    const stateWithMessages = initialState;
    expect(stateWithMessages.messages.length).toBeGreaterThan(0);

    const cleared = warningsReducer(
      stateWithMessages,
      WarningsActions.clearAll()
    );

    expect(cleared.messages.length).toBe(0);
  });
});
