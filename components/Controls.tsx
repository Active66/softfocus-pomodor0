import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  color: string;
}

const Controls: React.FC<ControlsProps> = ({ isActive, onToggle, onReset, color }) => {
  return (
    <div className="flex items-center gap-8 mt-10">
      <button
        onClick={onToggle}
        className={`
            w-20 h-20 rounded-full flex items-center justify-center
            text-2xl transition-all duration-200 focus:outline-none
            ${isActive 
                ? 'shadow-neumorph-inset text-gray-500 scale-95' 
                : 'shadow-neumorph text-gray-600 hover:text-[var(--active-color)] hover:scale-105 active:scale-95 active:shadow-neumorph-inset'
            }
        `}
        style={{ '--active-color': color } as React.CSSProperties}
        aria-label={isActive ? 'Pause' : 'Start'}
      >
        {isActive ? (
          <Pause size={32} style={{ color }} />
        ) : (
          <Play size={32} className="ml-1" style={{ color }} />
        )}
      </button>

      <button
        onClick={onReset}
        className="
            w-14 h-14 rounded-full flex items-center justify-center
            shadow-neumorph text-gray-400
            transition-all duration-200
            hover:text-gray-600 hover:scale-105
            active:scale-95 active:shadow-neumorph-inset
            focus:outline-none
        "
        aria-label="Reset"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};

export default Controls;