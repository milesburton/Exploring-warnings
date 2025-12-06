
export type MessageLevel = 'error' | 'warning' | 'info';

export interface WarningMessage {
  id: string;
  level: MessageLevel;
  text: string;
  /**
   * If true, message will auto-dismiss after a timeout (for errors, warnings, or info)
   */
  autoDismiss?: boolean;
}
