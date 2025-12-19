import React from 'react';
import { SessionRecord } from '../types';

interface RewardJarProps {
  history: SessionRecord[];
}

const RewardJar: React.FC<RewardJarProps> = ({ history }) => {
  // We want to visualize the tomatoes piling up. 
  // Reverse map to stack from bottom if we were using flex-col-reverse, 
  // but a flex-wrap content-start is good for a "filling up" look.
  
  return (
    <div className="w-full h-full relative">
       {/* Lid */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-300 rounded-t-lg z-10 shadow-neumorph"></div>
       <div className="absolute top-6 left-1/2 -translate-x-1/2 w-36 h-4 bg-gray-200 rounded-sm z-10 shadow-md"></div>

      {/* Jar Body - Glassmorphism */}
      <div className="w-full h-full mt-8 rounded-[3rem] glass-panel p-6 overflow-hidden relative border-t-0 rounded-t-3xl">
        
        {/* Reflection Highlight on Glass */}
        <div className="absolute top-4 right-8 w-8 h-32 bg-white opacity-10 rounded-full blur-xl transform -rotate-12 pointer-events-none"></div>

        {/* Tomatoes Container */}
        <div className="w-full h-full flex flex-wrap content-end gap-2 p-2 overflow-y-auto no-scrollbar">
            {history.map((session) => (
                <div 
                    key={session.id}
                    className="relative animate-in zoom-in duration-500 fade-in slide-in-from-top-4"
                >
                    {session.type === 'success' ? (
                        // 3D Glossy Red Tomato
                        <div className="w-12 h-12 bg-primary clay-sphere relative flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer" title="Focus Session Completed">
                             {/* Leaf */}
                            <div className="absolute -top-1 w-4 h-2 bg-green-500 rounded-full"></div>
                        </div>
                    ) : (
                        // Flat Yellow Tomato (Failed)
                        <div className="w-12 h-12 bg-mustard clay-flat relative flex items-center justify-center transform hover:rotate-12 transition-transform cursor-pointer opacity-90" title="Session Interrupted">
                             {/* Stem */}
                            <div className="absolute -top-1 w-1 h-3 bg-green-700/50"></div>
                        </div>
                    )}
                </div>
            ))}
            
            {history.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500/50 font-bold text-lg select-none">
                    Start Focusing
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default RewardJar;