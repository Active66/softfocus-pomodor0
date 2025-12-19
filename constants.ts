import { TimerMode, TimerSettings } from './types';

export const DEFAULT_SETTINGS: TimerSettings = {
  [TimerMode.WORK]: 25,
  [TimerMode.SHORT_BREAK]: 5,
  [TimerMode.LONG_BREAK]: 15,
};

export const MODE_LABELS: Record<TimerMode, string> = {
  [TimerMode.WORK]: 'Focus',
  [TimerMode.SHORT_BREAK]: 'Short Break',
  [TimerMode.LONG_BREAK]: 'Long Break',
};

// Colors corresponding to modes
export const MODE_COLORS: Record<TimerMode, string> = {
  [TimerMode.WORK]: '#ff6b6b',       // Soft Red
  [TimerMode.SHORT_BREAK]: '#4ecdc4', // Soft Teal
  [TimerMode.LONG_BREAK]: '#45b7d1',  // Soft Blue
};

export const LOCAL_STORAGE_KEY = 'pomodoro-settings-v1';