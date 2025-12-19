export enum TimerMode {
  WORK = 'work',
  SHORT_BREAK = 'short',
  LONG_BREAK = 'long'
}

export interface TimerSettings {
  [TimerMode.WORK]: number;
  [TimerMode.SHORT_BREAK]: number;
  [TimerMode.LONG_BREAK]: number;
}

export interface ThemeColors {
  primary: string;
  bg: string;
}

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  isActive: boolean;
}

export type SessionType = 'success' | 'failure';

export interface SessionRecord {
  id: string;
  type: SessionType;
  timestamp: number;
}