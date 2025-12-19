import React from 'react';
import { SessionRecord } from '../types';

interface StatsProps {
  history: SessionRecord[];
}

const Stats: React.FC<StatsProps> = ({ history }) => {
  const successful = history.filter(h => h.type === 'success').length;
  const failed = history.filter(h => h.type === 'failure').length;
  const totalHours = ((successful * 25) / 60).toFixed(1);

  return (
    <div className="w-full flex justify-around items-center p-6 rounded-3xl shadow-neumorph-sm bg-background mt-8">
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Focus</p>
        <p className="text-2xl font-black text-primary">{successful}</p>
      </div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Failed</p>
        <p className="text-2xl font-black text-mustard">{failed}</p>
      </div>
      <div className="w-px h-8 bg-gray-300"></div>
      <div className="text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hours</p>
        <p className="text-2xl font-black text-text">{totalHours}</p>
      </div>
    </div>
  );
};

export default Stats;