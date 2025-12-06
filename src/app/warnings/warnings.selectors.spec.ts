import { WarningsState } from './warnings.reducer';
import * as selectors from './warnings.selectors';

describe('warnings selectors', () => {
  const makeState = (messages: any[] = []) => ({ messages });

  it('selectAllMessages returns all messages', () => {
    const state: WarningsState = makeState([
      { id: '1', level: 'error', text: 'err' },
      { id: '2', level: 'info', text: 'info' },
    ]);
    expect(selectors.selectAllMessages.projector(state)).toEqual(state.messages);
  });

  it('selectCounts returns correct counts', () => {
    const state: WarningsState = makeState([
      { id: '1', level: 'error', text: 'err' },
      { id: '2', level: 'warning', text: 'warn' },
      { id: '3', level: 'info', text: 'info' },
      { id: '4', level: 'error', text: 'err2' },
    ]);
    expect(selectors.selectCounts.projector(state.messages)).toEqual({
      error: 2,
      warning: 1,
      info: 1,
      total: 4,
    });
  });

  it('selectHighestSeverity returns error if any error', () => {
    const counts = { error: 1, warning: 2, info: 3, total: 6 };
    expect(selectors.selectHighestSeverity.projector(counts)).toBe('error');
  });

  it('selectHighestSeverity returns warning if no error', () => {
    const counts = { error: 0, warning: 2, info: 3, total: 5 };
    expect(selectors.selectHighestSeverity.projector(counts)).toBe('warning');
  });

  it('selectHighestSeverity returns info if no error/warning', () => {
    const counts = { error: 0, warning: 0, info: 2, total: 2 };
    expect(selectors.selectHighestSeverity.projector(counts)).toBe('info');
  });

  it('selectHighestSeverity returns none if no messages', () => {
    const counts = { error: 0, warning: 0, info: 0, total: 0 };
    expect(selectors.selectHighestSeverity.projector(counts)).toBe('none');
  });
});
