'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

// If you're not actually using these Card components, you can remove them 
// or replace them with plain <div> containers.

const STORAGE_KEY = 'yearProgressState';
const UPDATE_INTERVAL = 60000;

// GitHub-like green scale
const GITHUB_COLORS = [
  "#EBEDF0", // future, no activity
  "#c6e48b",
  "#7bc96f",
  "#239a3b",
  "#196127"  // darkest green
];

interface YearProgressState {
  daysElapsed: number;        // how many whole days so far
  currentDayProgress: number; // fraction of today's progress
  progress: number;           // 0–100% of year done
  lastUpdate: string;
  timezone: string;
}

// Safely retrieve window.localStorage if available
const getStorageWithFallback = () => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return { getItem: () => null, setItem: () => null };
  }
};

// Compute how many days have elapsed in the current year
const getDaysElapsedThisYear = (now: Date) => {
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const diff = now.getTime() - startOfYear.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

export default function YearProgress() {
  const storage = getStorageWithFallback();

  // Create an initial progress state
  const getInitialState = (): YearProgressState => {
    const now = new Date();
    const totalDays = getDaysElapsedThisYear(now);
    const completeDays = Math.floor(totalDays);
    const partialDay = totalDays - completeDays;
    return {
      daysElapsed: completeDays,
      currentDayProgress: partialDay,
      progress: (totalDays / 365) * 100,
      lastUpdate: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  };

  const [state, setState] = useState<YearProgressState>(getInitialState);

  // Update progress every minute
  const calculateProgress = () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

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
    const timer = setInterval(calculateProgress, UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  /** Layout/config similar to GitHub’s style */
  const cellSize = 11; 
  const cellGap = 2;   
  const numRows = 7;
  const currentYear = new Date().getFullYear();

  // Sunday=0, Monday=1, etc. Used to offset the top‐left cell
  const firstDayOffset = new Date(currentYear, 0, 1).getDay();

  // Day # for Dec 31
  const dec31 = new Date(currentYear, 11, 31);
  const dayNumberDec31 = Math.floor(
    (dec31.getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24)
  );
  const lastColIndex = Math.floor((dayNumberDec31 + firstDayOffset) / numRows);
  const totalCols = lastColIndex + 1;

  // Color function – future => light grey, partial => mid green, past => dark green
  const getCellColor = (dayNumber: number) => {
    if (dayNumber < state.daysElapsed) {
      return GITHUB_COLORS[4]; // darkest green
    } else if (dayNumber === state.daysElapsed) {
      const intensity = Math.floor(state.currentDayProgress * 4); // 0..3
      // shift that into the scale [1..4]
      const colorIndex = Math.min(4, Math.max(1, intensity + 1));
      return GITHUB_COLORS[colorIndex];
    } else {
      return GITHUB_COLORS[0]; // future
    }
  };

  // For the tooltip, e.g. "January 3, 2025"
  const formatDate = (dayNumber: number) => {
    const date = new Date(currentYear, 0, dayNumber + 1);
    // Long month format, e.g. "January 3, 2025"
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render the 7-row x totalCols grid
  const generateGrid = () => {
    const rows = [];
    for (let row = 0; row < numRows; row++) {
      const rowCells = [];
      for (let col = 0; col < totalCols; col++) {
        const dayNumber = col * numRows + row - firstDayOffset;
        if (dayNumber >= 0 && dayNumber <= dayNumberDec31) {
          const dateStr = formatDate(dayNumber);
          rowCells.push(
            <div
              key={`day-${dayNumber}`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: getCellColor(dayNumber),
                borderRadius: 2
              }}
              // Tooltip text:
              title={dateStr}
            />
          );
        } else {
          // blank cell
          rowCells.push(
            <div
              key={`empty-${row}-${col}`}
              style={{ width: cellSize, height: cellSize }}
            />
          );
        }
      }
      rows.push(
        <div key={`row-${row}`} style={{ display: 'flex', gap: cellGap }}>
          {rowCells}
        </div>
      );
    }
    return rows;
  };

  // Absolutely-positioned month labels
  const monthLabels = () => {
    const labels = [];
    for (let m = 0; m < 12; m++) {
      const firstOfMonth = new Date(currentYear, m, 1);
      if (firstOfMonth.getFullYear() !== currentYear) continue;
      const dayIndex = Math.floor(
        (firstOfMonth.getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24)
      );
      const colIndex = Math.floor((dayIndex + firstDayOffset) / numRows);
      if (colIndex < 0 || colIndex >= totalCols) continue;

      const leftOffset = colIndex * (cellSize + cellGap);
      // e.g. "Jan", "Feb"
      const monthName = firstOfMonth.toLocaleString(undefined, { month: 'short' });

      labels.push(
        <div
          key={`month-${m}`}
          style={{
            position: 'absolute',
            left: leftOffset,
            top: 0,
            whiteSpace: 'nowrap',
            fontSize: 11
          }}
        >
          {monthName}
        </div>
      );
    }
    return labels;
  };

  // Figure out overall width/height so we can position everything neatly
  const gridWidth = totalCols * (cellSize + cellGap) - cellGap;
  const gridHeight = numRows * (cellSize + cellGap) - cellGap;

  return (
    <div className="min-h-screen bg-background p-8 flex justify-center items-center">
      {/* No more max-w-5xl: let the grid fill the space */}
      <Card className="bg-background text-foreground w-auto border shadow p-4">
        <CardContent>
          <div className="mb-6">
            <div className="text-lg mb-1">
              Year Progress – {state.progress.toFixed(2)}% Complete
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.floor(state.daysElapsed / 7)} weeks elapsed &bull; {52 - Math.floor(state.daysElapsed / 7)} weeks remaining
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date(state.lastUpdate).toLocaleString()}
              {state.timezone && ` (${state.timezone})`}
            </div>
          </div>

          {/* The grid area */}
          <div style={{ position: 'relative', width: gridWidth }}>
            {/* Month labels row */}
            <div style={{ position: 'relative', height: 15, marginBottom: 4 }}>
              {monthLabels()}
            </div>

            {/* The main 7xN grid */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginTop: 10 }}>
              <span style={{ fontSize: 12 }}>Less</span>
              {GITHUB_COLORS.map((clr, idx) => (
                <div
                  key={`legend-${idx}`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    backgroundColor: clr,
                    borderRadius: 2
                  }}
                />
              ))}
              <span style={{ fontSize: 12 }}>More</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
