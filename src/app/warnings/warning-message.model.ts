
export type MessageLevel = 'error' | 'warning' | 'info';

export interface WarningMessage {
  id: string;
  level: MessageLevel;
  text: string;
  
  autoDismiss?: boolean;
}
