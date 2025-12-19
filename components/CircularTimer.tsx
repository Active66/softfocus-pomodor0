import React from 'react';
import { formatTime } from '../utils';

interface CircularTimerProps {
  timeLeft: number;
  totalTime: number;
  color: string;
  isActive: boolean;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ timeLeft, totalTime, color, isActive }) => {
  // SVG Config
  const radius = 130; // Slightly larger
  const stroke = 16; // Thicker for "Clay" feel
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const strokeDashoffset = circumference - ((timeLeft / totalTime) * circumference);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Neumorphic Circle Container - Enhanced Shadow */}
      <div className="w-80 h-80 rounded-full shadow-neumorph flex items-center justify-center bg-background">
        {/* Inner shadow for depth - Softer, deeper inset */}
        <div className="w-72 h-72 rounded-full shadow-neumorph-inset flex items-center justify-center relative">
            
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90 absolute"
              style={{ filter: 'drop-shadow(0px 0px 2px rgba(255,255,255,0.5))' }}
            >
              {/* Background Track - darker for contrast */}
              <circle
                stroke="#ced6e0" 
                strokeWidth={stroke}
                fill="transparent"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="opacity-50"
              />
              {/* Progress Circle - Rounded Caps */}
              <circle
                stroke={color}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ 
                    strokeDashoffset,
                    transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' 
                }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>

            {/* Time Text */}
            <div className="flex flex-col items-center justify-center z-10">
                <span 
                    className="text-6xl font-extrabold text-text tabular-nums tracking-wider select-none color-transition drop-shadow-sm"
                    style={{ color: isActive ? color : undefined }}
                >
                    {formatTime(timeLeft)}
                </span>
                <span className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-[0.2em] opacity-80">
                    {isActive ? 'Focusing' : 'Ready'}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;