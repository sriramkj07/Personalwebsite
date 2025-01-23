'use client';

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
    // If localStorage isn't available (e.g. private mode in iOS), return a safe fallback
    return {
      getItem: () => null,
      setItem: () => null
    };
  }
};

const YearProgress = () => {
  const storage = getStorageWithFallback();

  // Initialize our progress state
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

  // Month labels (Jan -> Dec)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Recompute every minute
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
      // Fallback to the initial state if an error occurs
      setState(getInitialState());
    }
  };

  useEffect(() => {
    calculateProgress();
    const interval = setInterval(calculateProgress, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Color intensity for each cell
  const getDayIntensity = (dayNumber: number): string => {
    // Past days get the darkest color
    if (dayNumber < state.daysElapsed) {
      return 'bg-green-600';
    }

    // The current day is part-filled
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

    // Future days get the muted color
    return 'bg-muted';
  };

  // Convert a day index to an actual date for tooltips
  const formatDate = (dayNumber: number): string => {
    const date = new Date(new Date().getFullYear(), 0, dayNumber + 1);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Generate the 7×(up to)53 grid
  const generateGrid = () => {
    const rows = [];
    // 7 rows = days of the week, up to 53 columns = weeks of the year
    const numRows = 7;
    const numCols = 53;

    // Offset so that the first column lines up with the first day of the year’s weekday
    const firstDayOffset = new Date(new Date().getFullYear(), 0, 1).getDay();

    for (let row = 0; row < numRows; row++) {
      const rowDays = [];
      for (let col = 0; col < numCols; col++) {
        const dayNumber = col * numRows + row - firstDayOffset;

        // Only render days >= 0 (i.e. actual days in the year)
        if (dayNumber >= 0) {
          const date = formatDate(dayNumber);
          const completionPercent =
            dayNumber < state.daysElapsed
              ? 100
              : dayNumber === state.daysElapsed
              ? (state.currentDayProgress * 100).toFixed(1)
              : 0;

          rowDays.push(
            <div
              key={`day-${dayNumber}`}
              className={`w-3 h-3 rounded-sm ${getDayIntensity(dayNumber)} transition-colors duration-200`}
              title={`${date} – ${completionPercent}%`}
            />
          );
        } else {
          // Empty placeholder before the first real day of the year
          rowDays.push(
            <div key={`empty-${row}-${col}`} className="w-3 h-3"/>
          );
        }
      }
      rows.push(
        <div key={`row-${row}`} className="flex gap-1">
          {rowDays}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="min-h-screen bg-background p-4 flex justify-center items-center">
      <Card className="bg-background text-foreground w-full max-w-6xl">
        <CardContent>
          <div className="mb-8">
            <div className="text-xl mb-2">
              Year Progress – {state.progress.toFixed(2)}% Complete
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
            {/* Month labels across the top */}
            <div className="flex mb-2 text-sm justify-center">
              {months.map((month, i) => (
                <div key={`month-${i}`} className="w-12 text-center">
                  {month}
                </div>
              ))}
            </div>

            {/* The grid itself */}
            <div className="flex flex-col gap-1 items-center">
              {generateGrid()}
            </div>

            {/* Legend */}
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
