import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WarningsState, warningsFeatureKey } from './warnings.reducer';

export const selectWarningsState =
  createFeatureSelector<WarningsState>(warningsFeatureKey);

export const selectAllMessages = createSelector(
  selectWarningsState,
  s => s.messages,
);

export const selectCounts = createSelector(selectAllMessages, messages => ({
  error: messages.filter(m => m.level === 'error').length,
  warning: messages.filter(m => m.level === 'warning').length,
  info: messages.filter(m => m.level === 'info').length,
  total: messages.length,
}));

export const selectHighestSeverity = createSelector(selectCounts, counts => {
  if (counts.error > 0) return 'error';
  if (counts.warning > 0) return 'warning';
  if (counts.info > 0) return 'info';
  return 'none';
});
