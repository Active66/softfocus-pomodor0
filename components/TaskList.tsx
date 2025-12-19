import React, { useState } from 'react';
import { Plus, Check, Trash2, Circle } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onSelectTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask,
  onSelectTask 
}) => {
  const [inputText, setInputText] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAddTask(inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 rounded-[3rem] shadow-neumorph bg-background">
      <h2 className="text-xl font-bold text-text mb-6 pl-2 tracking-wide">Today's Goals</h2>
      
      {/* Task List Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 mb-4 pr-2">
        {tasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
            <p>No tasks yet.</p>
            <p className="text-sm">Add one to start focusing.</p>
          </div>
        )}
        
        {tasks.map(task => (
          <div 
            key={task.id}
            onClick={() => onSelectTask(task.id)}
            className={`
              group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300
              ${task.isActive 
                ? 'shadow-neumorph-inset bg-background border-l-4 border-primary' 
                : 'shadow-neumorph hover:translate-y-[-2px]'
              }
              ${task.isCompleted ? 'opacity-60' : 'opacity-100'}
            `}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleTask(task.id);
                }}
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center transition-all
                  ${task.isCompleted ? 'bg-secondary text-white shadow-none' : 'shadow-neumorph-inset text-transparent hover:text-gray-300'}
                `}
              >
                <Check size={14} strokeWidth={4} />
              </button>
              <span className={`text-sm font-semibold truncate ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {task.text}
              </span>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-primary transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleAdd} className="mt-auto relative">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full p-4 pr-12 rounded-2xl shadow-neumorph-inset bg-background outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <button 
          type="submit"
          disabled={!inputText.trim()}
          className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-xl bg-primary text-white shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} />
        </button>
      </form>
    </div>
  );
};

export default TaskList;