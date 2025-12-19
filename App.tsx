import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Since we can't import uuid without package.json, we'll write a simple helper or assume standard id gen. *Self correction: standard JS random for demo*

import { TimerMode, TimerSettings, Task, SessionRecord } from './types';
import { DEFAULT_SETTINGS, MODE_COLORS, LOCAL_STORAGE_KEY } from './constants';
import { formatTime } from './utils';

import CircularTimer from './components/CircularTimer';
import Controls from './components/Controls';
import ModeToggle from './components/ModeToggle';
import SettingsModal from './components/SettingsModal';
import TaskList from './components/TaskList';
import RewardJar from './components/RewardJar';
import Stats from './components/Stats';

// Simple ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  // --- State ---
  const [mode, setMode] = useState<TimerMode>(TimerMode.WORK);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_SETTINGS[TimerMode.WORK] * 60);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  
  // New State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [history, setHistory] = useState<SessionRecord[]>([]);

  // --- Initialization ---
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.settings) setSettings(parsed.settings);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.history) setHistory(parsed.history);
        
        // Init timer based on stored settings if fresh load
        if (!isActive && parsed.settings) {
           setTimeLeft(parsed.settings[mode] * 60);
        }
      } catch (e) {
        // Fallback for old version or error
        console.error("Failed to parse storage", e);
      }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    const stateToSave = { settings, tasks, history };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [settings, tasks, history]);

  // --- Timer Logic ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // --- Handlers ---
  
  const handleTimerComplete = () => {
    // Only record history for Work sessions
    if (mode === TimerMode.WORK) {
      const newRecord: SessionRecord = {
        id: generateId(),
        type: 'success',
        timestamp: Date.now()
      };
      setHistory(prev => [...prev, newRecord]);
      
      // If there is an active task, we could optionally mark progress, 
      // but for now let's just keep it simple.
    }
    // Switch to break? Or just play sound.
    // For this UI demo, we stop.
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(settings[newMode] * 60);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    // If resetting while active in Work mode, it's a "failure" (gave up)
    if (isActive && mode === TimerMode.WORK) {
        const newRecord: SessionRecord = {
            id: generateId(),
            type: 'failure',
            timestamp: Date.now()
        };
        setHistory(prev => [...prev, newRecord]);
    }

    setIsActive(false);
    setTimeLeft(settings[mode] * 60);
  };

  const handleSettingsSave = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    if (!isActive) {
      setTimeLeft(newSettings[mode] * 60);
    }
  };

  // --- Task Handlers ---
  const addTask = (text: string) => {
    const newTask: Task = {
      id: generateId(),
      text,
      isCompleted: false,
      isActive: tasks.length === 0 // Make active if it's the first one
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const selectTask = (id: string) => {
    setTasks(prev => prev.map(t => ({
      ...t,
      isActive: t.id === id
    })));
  };

  // Calculate total time in seconds for the progress bar
  const totalTime = settings[mode] * 60;
  const currentColor = MODE_COLORS[mode];

  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/20 flex flex-col items-center lg:justify-center p-4 lg:p-8 transition-colors duration-500 overflow-x-hidden">
      
      {/* Top Bar */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-8 lg:mb-12 px-4">
        <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight flex items-center gap-2">
            Soft<span style={{color: currentColor}} className="color-transition">Focus</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-md text-gray-500 ml-2 shadow-inner">BETA</span>
        </h1>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-12 h-12 rounded-full shadow-neumorph flex items-center justify-center text-gray-500 hover:text-gray-700 active:shadow-neumorph-inset transition-all"
        >
          <Settings size={22} />
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-auto lg:h-[600px]">
        
        {/* Left Column: Tasks */}
        <div className="lg:col-span-3 order-2 lg:order-1 h-[400px] lg:h-full">
            <TaskList 
                tasks={tasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                onSelectTask={selectTask}
            />
        </div>

        {/* Center Column: Timer */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center">
            
            <ModeToggle 
              currentMode={mode} 
              onModeChange={handleModeChange} 
            />

            <div className="scale-90 sm:scale-100 lg:scale-110 transition-transform duration-300">
                <CircularTimer 
                    timeLeft={timeLeft}
                    totalTime={totalTime}
                    color={currentColor}
                    isActive={isActive}
                />
            </div>

            <Controls 
              isActive={isActive}
              onToggle={toggleTimer}
              onReset={resetTimer}
              color={currentColor}
            />

            <div className="w-full max-w-md mt-8">
               <Stats history={history} />
            </div>
        </div>

        {/* Right Column: Reward Jar */}
        <div className="lg:col-span-3 order-3 lg:order-3 h-[300px] lg:h-full">
            <RewardJar history={history} />
        </div>

      </div>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSettingsSave}
      />
    </div>
  );
};

export default App;