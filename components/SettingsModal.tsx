import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { TimerSettings, TimerMode } from '../types';
import { MODE_LABELS } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TimerSettings;
  onSave: (newSettings: TimerSettings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState<TimerSettings>(settings);

  useEffect(() => {
    if (isOpen) {
      setLocalSettings(settings);
    }
  }, [isOpen, settings]);

  const handleChange = (mode: TimerMode, value: string) => {
    const numVal = parseInt(value, 10);
    if (!isNaN(numVal) && numVal > 0 && numVal <= 120) {
      setLocalSettings(prev => ({ ...prev, [mode]: numVal }));
    }
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-background w-full max-w-sm rounded-3xl shadow-neumorph p-8 animate-in fade-in zoom-in duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text">Settings</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full shadow-neumorph flex items-center justify-center text-gray-400 hover:text-red-500 active:shadow-neumorph-inset transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {Object.values(TimerMode).map((mode) => (
            <div key={mode} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-500 ml-2">
                {MODE_LABELS[mode]} (minutes)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={localSettings[mode]}
                  onChange={(e) => handleChange(mode, e.target.value)}
                  className="w-full p-4 rounded-xl bg-background shadow-neumorph-inset outline-none text-text font-bold focus:ring-2 focus:ring-opacity-50 focus:ring-gray-400"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-xl shadow-neumorph bg-background text-primary font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 active:shadow-neumorph-inset transition-all"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;