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
    return window.localStorage;
  } catch {
    return {
      getItem: () => null,
      setItem: () => null
    };
  }
};

const getTotalDaysPassed = (now: Date) => {
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - startOfYear.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

const YearProgress = () => {
  const storage = getStorageWithFallback();

  // Compute an initial state
  const getInitialState = (): YearProgressState => {
    const now = new Date();
    const totalDaysPassed = getTotalDaysPassed(now);
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

  // Refresh progress every minute
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 7 rows (days of week) × up to 53 columns (weeks)
  const numRows = 7;
  const numCols = 53;
  const cellSize = 14; // px
  const cellGap = 4;   // px

  const currentYear = new Date().getFullYear();
  // Offset so Jan 1 aligns on its actual weekday
  const firstDayOffset = new Date(currentYear, 0, 1).getDay();

  // Color intensity for each cell
  const getDayIntensity = (dayNumber: number): string => {
    if (dayNumber < state.daysElapsed) {
      return 'bg-green-600';
    }
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

  // For hover tooltips
  const formatDate = (dayNumber: number): string => {
    const date = new Date(currentYear, 0, dayNumber + 1);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render the 7×53 grid
  const generateGrid = () => {
    const rows = [];
    for (let row = 0; row < numRows; row++) {
      const rowCells = [];
      for (let col = 0; col < numCols; col++) {
        const dayNumber = col * numRows + row - firstDayOffset;
        if (dayNumber >= 0 && dayNumber < 365) {
          const dateStr = formatDate(dayNumber);
          const completionPercent =
            dayNumber < state.daysElapsed
              ? 100
              : dayNumber === state.daysElapsed
              ? (state.currentDayProgress * 100).toFixed(1)
              : 0;

          rowCells.push(
            <div
              key={`day-${dayNumber}`}
              className={`transition-colors duration-200 rounded-sm ${getDayIntensity(dayNumber)}`}
              style={{ width: cellSize, height: cellSize }}
              title={`${dateStr} – ${completionPercent}%`}
            />
          );
        } else {
          // Empty cell for days before Jan 1 or after Dec 31
          rowCells.push(
            <div
              key={`empty-${row}-${col}`}
              style={{ width: cellSize, height: cellSize }}
            />
          );
        }
      }
      rows.push(
        <div key={`row-${row}`} className="flex" style={{ gap: cellGap }}>
          {rowCells}
        </div>
      );
    }
    return rows;
  };

  // Compute month label positions
  // For each month, find its dayNumber => figure out its column => place label
  const monthLabels = () => {
    const labels = [];
    for (let m = 0; m < 12; m++) {
      const firstOfMonth = new Date(currentYear, m, 1);
      const dayNumber = Math.floor(
        (firstOfMonth.getTime() - new Date(currentYear, 0, 1).getTime())
        / (1000 * 60 * 60 * 24)
      );
      const colIndex = Math.floor((dayNumber + firstDayOffset) / numRows);
      if (colIndex < 0 || colIndex >= numCols) continue;
      const leftOffset = colIndex * (cellSize + cellGap);
      const monthName = firstOfMonth.toLocaleString(undefined, { month: 'short' });

      labels.push(
        <div
          key={m}
          style={{
            position: 'absolute',
            left: leftOffset,
            top: 0,
            transform: 'translateX(0)',
            whiteSpace: 'nowrap'
          }}
        >
          {monthName}
        </div>
      );
    }
    return labels;
  };

  const gridWidth = numCols * (cellSize + cellGap) - cellGap; // last column doesn't add gap
  const gridHeight = numRows * (cellSize + cellGap) - cellGap;

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

          <div className="relative" style={{ width: gridWidth }}>
            {/* Month labels aligned to columns */}
            <div style={{ position: 'relative', height: '16px', marginBottom: '4px' }}>
              {monthLabels()}
            </div>

            {/* The grid */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: cellGap,
                width: gridWidth,
                height: gridHeight
              }}
            >
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
