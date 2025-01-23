'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const STORAGE_KEY = 'yearProgressState';
const UPDATE_INTERVAL = 60000;

interface YearProgressState {
  daysElapsed: number;
  currentDayProgress: number;
  progress: number;
  lastUpdate: string;
  timezone: string;
}

const getStorageWithFallback = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    return window.localStorage || {
      getItem: () => null,
      setItem: () => null
    };
  } catch {
    return {
      getItem: () => null,
      setItem: () => null
    };
  }
};

const YearProgress = () => {
  const storage = getStorageWithFallback();

  const getInitialState = (): YearProgressState => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - startOfYear.getTime();
    const totalDaysPassed = diff / (1000 * 60 * 60 * 24);
    const completeDays = Math.floor(totalDaysPassed);
    const partialDay = totalDaysPassed - completeDays;
  
    return {
      daysElapsed: completeDays,
      currentDayProgress: partialDay,
      progress: (totalDaysPassed / 365) * 100,
      lastUpdate: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  };

  const [state, setState] = useState<YearProgressState>(getInitialState);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const calculateProgress = () => {
    try {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      
      const diff = now.getTime() - startOfYear.getTime();
      const totalTime = endOfYear.getTime() - startOfYear.getTime();
      const totalDaysPassed = diff / (1000 * 60 * 60 * 24);
      const completeDays = Math.floor(totalDaysPassed);
      const partialDay = totalDaysPassed - completeDays;
      
      const newState: YearProgressState = {
        daysElapsed: completeDays,
        currentDayProgress: partialDay,
        progress: (diff / totalTime) * 100,
        lastUpdate: now.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      setState(newState);
      storage?.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.error('Error calculating progress:', error);
      setState(getInitialState());
    }
  };

  useEffect(() => {
    calculateProgress();
    const interval = setInterval(calculateProgress, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const getDayIntensity = (dayNumber: number): string => {
    if (dayNumber < state.daysElapsed) return 'bg-green-600';
    
    if (dayNumber === state.daysElapsed) {
      const intensity = Math.floor(state.currentDayProgress * 4);
      switch (intensity) {
        case 0: return 'bg-green-300';
        case 1: return 'bg-green-400';
        case 2: return 'bg-green-500';
        case 3: return 'bg-green-600';
        default: return 'bg-green-300';
      }
    }
    
    return 'bg-muted';
  };

  const formatDate = (dayNumber: number): string => {
    const date = new Date(new Date().getFullYear(), 0, dayNumber + 1);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generateGrid = () => {
    const days = [];
    // Fixed number of columns (7) and rows (53) to match GitHub's layout
    const columns = 7;
    const rows = 53;
    
    // Calculate the first day of the year offset
    const firstDayOffset = new Date(new Date().getFullYear(), 0, 1).getDay();
    
    // Generate the grid
    for (let col = 0; col < columns; col++) {
      const weekDays = [];
      for (let row = 0; row < rows; row++) {
        const dayNumber = row * columns + col - firstDayOffset;
        
        if (dayNumber >= 0) {
          const date = formatDate(dayNumber);
          const completionPercent = dayNumber < state.daysElapsed ? 100 :
                                   dayNumber === state.daysElapsed ? (state.currentDayProgress * 100).toFixed(1) :
                                   0;
          
          weekDays.push(
            <div
              key={`day-${dayNumber}`}
              className={`w-3 h-3 rounded-sm ${getDayIntensity(dayNumber)} transition-colors duration-200`}
              title={`${date} - ${completionPercent}%`}
            />
          );
        } else {
          weekDays.push(
            <div
              key={`empty-${col}-${row}`}
              className="w-3 h-3"
            />
          );
        }
      }
      days.push(
        <div key={`week-${col}`} className="flex flex-col gap-1">
          {weekDays}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-background p-4 flex justify-center items-center">
      <Card className="bg-background text-foreground w-full max-w-6xl">
        <CardContent>
          <div className="mb-8">
            <div className="text-xl mb-2">
              Year Progress - {state.progress.toFixed(2)}% Complete
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.floor(state.daysElapsed / 7)} weeks elapsed • {52 - Math.floor(state.daysElapsed / 7)} weeks remaining
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date(state.lastUpdate).toLocaleString()} 
              {state.timezone && ` (${state.timezone})`}
            </div>
          </div>
          
          <div className="relative">
            <div className="flex mb-2 text-sm">
              <div className="w-12"></div>
              {months.map((month, i) => (
                <div key={`month-${i}`} className="flex-1 text-center">{month}</div>
              ))}
            </div>

            <div className="flex">
              <div className="w-12"></div>
              <div className="flex gap-1 flex-1">
                {generateGrid()}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm justify-end">
              <span>0%</span>
              <div className="w-3 h-3 rounded-sm bg-muted" />
              <div className="w-3 h-3 rounded-sm bg-green-300" />
              <div className="w-3 h-3 rounded-sm bg-green-400" />
              <div className="w-3 h-3 rounded-sm bg-green-500" />
              <div className="w-3 h-3 rounded-sm bg-green-600" />
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YearProgress;
