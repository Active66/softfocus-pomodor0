import React from 'react';
import { TimerMode } from '../types';
import { MODE_LABELS } from '../constants';

interface ModeToggleProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="p-2 rounded-2xl shadow-neumorph-inset bg-background flex justify-between items-center mb-10 max-w-md w-full">
      {Object.values(TimerMode).map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`
            flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300
            focus:outline-none
            ${currentMode === mode 
              ? 'shadow-neumorph text-gray-700 bg-background' 
              : 'text-gray-400 hover:text-gray-600'
            }
          `}
        >
          {MODE_LABELS[mode]}
        </button>
      ))}
    </div>
  );
};

export default ModeToggle;