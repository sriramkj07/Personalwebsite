'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const STORAGE_KEY = 'yearProgressState';
const UPDATE_INTERVAL = 60000;

// A 5-step GitHub-like color scale, from “no activity” up to “most intense”
const GITHUB_COLORS = [
  "#EBEDF0", // 0% (future days)
  "#c6e48b", // ~25%
  "#7bc96f", // ~50%
  "#239a3b", // ~75%
  "#196127"  // 100% (fully in the past)
];

interface YearProgressState {
  daysElapsed: number;        // how many whole days into the year we are
  currentDayProgress: number; // fraction of the current day completed
  progress: number;           // 0–100% of the year done
  lastUpdate: string;         // ISO string of last update
  timezone: string;           // e.g. "America/Los_Angeles"
}

/** Safely retrieve window.localStorage if available */
const getStorageWithFallback = () => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return { getItem: () => null, setItem: () => null };
  }
};

/** Compute how many days have elapsed since Jan 1 of the current year */
const getDaysElapsedThisYear = (now: Date) => {
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const diff = now.getTime() - startOfYear.getTime();
  return diff / (1000 * 60 * 60 * 24); // days
};

const YearProgress = () => {
  const storage = getStorageWithFallback();

  /** Create an initial progress state */
  const getInitialState = (): YearProgressState => {
    const now = new Date();
    const totalDays = getDaysElapsedThisYear(now);
    const completeDays = Math.floor(totalDays);
    const partialDay = totalDays - completeDays;

    return {
      daysElapsed: completeDays,
      currentDayProgress: partialDay,
      // approximate fraction of the year out of 365 (you could handle leap years if you want)
      progress: (totalDays / 365) * 100,
      lastUpdate: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  };

  const [state, setState] = useState<YearProgressState>(getInitialState);

  /** Recalculate progress every minute */
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
      // fallback
      setState(getInitialState());
    }
  };

  useEffect(() => {
    calculateProgress();
    const timer = setInterval(calculateProgress, UPDATE_INTERVAL);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Config for “GitHub‐style” layout */
  const cellSize = 10; // px
  const cellGap = 2;   // px
  const numRows = 7;   // days of week
  const currentYear = new Date().getFullYear();

  // figure out the weekday for Jan 1 => that many cells are “shifted” in the top-left
  const firstDayOffset = new Date(currentYear, 0, 1).getDay(); // Sunday=0, Monday=1, etc.

  // We want to skip any columns that occur after Dec 31 so we only show up to the last day
  const dec31 = new Date(currentYear, 11, 31);
  const dayNumberDec31 = Math.floor(
    (dec31.getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24)
  ); // 364 or 365 if leap year
  const lastColIndex = Math.floor((dayNumberDec31 + firstDayOffset) / numRows);
  // We'll go up to this many columns (plus 1)
  const totalCols = lastColIndex + 1;

  /**
   * Determine the color for a given dayNumber by comparing it to daysElapsed.
   * dayNumber < state.daysElapsed => fully in the past => darkest green
   * dayNumber == state.daysElapsed => partial => scale 1..3 green
   * dayNumber > state.daysElapsed => future => color #EBEDF0
   */
  const getCellColor = (dayNumber: number) => {
    if (dayNumber < state.daysElapsed) {
      return GITHUB_COLORS[4]; // darkest green
    } else if (dayNumber === state.daysElapsed) {
      const intensity = Math.floor(state.currentDayProgress * 4); // from 0..3
      // 0 => light green, 3 => dark green
      return GITHUB_COLORS[intensity === 0 ? 1 : intensity]; 
      // Or map exactly: 0->1, 1->2, 2->3, 3->4 if you want
    } else {
      return GITHUB_COLORS[0]; // future (lightest gray)
    }
  };

  /** For tooltip on each cell */
  const formatDate = (dayNumber: number) => {
    const date = new Date(currentYear, 0, dayNumber + 1);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /** Render the 7 x `totalCols` grid */
  const generateGrid = () => {
    const rows: JSX.Element[] = [];
    for (let row = 0; row < numRows; row++) {
      const rowCells: JSX.Element[] = [];
      for (let col = 0; col < totalCols; col++) {
        // figure out which day of the year this cell represents
        const dayNumber = col * numRows + row - firstDayOffset;
        // if dayNumber is within [0..364 or 365], show a real day cell
        if (dayNumber >= 0 && dayNumber <= dayNumberDec31) {
          const dateStr = formatDate(dayNumber);
          rowCells.push(
            <div
              key={`day-${dayNumber}`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: getCellColor(dayNumber),
                borderRadius: 2 // GitHub squares have slightly rounded corners
              }}
              title={dateStr}
            />
          );
        } else {
          // blank cell (before Jan 1 or after Dec 31)
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

  /** Absolutely-position month labels above correct column */
  const monthLabels = () => {
    const labels: JSX.Element[] = [];
    for (let m = 0; m < 12; m++) {
      // day index for the 1st of month `m`
      const firstOfMonth = new Date(currentYear, m, 1);
      if (firstOfMonth.getFullYear() !== currentYear) continue; // skip if out of year range
      const dayIndex = Math.floor(
        (firstOfMonth.getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24)
      );
      const colIndex = Math.floor((dayIndex + firstDayOffset) / numRows);
      if (colIndex < 0 || colIndex >= totalCols) continue; // skip if out of the rendered columns

      const leftOffset = colIndex * (cellSize + cellGap);
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

  // total width & height of the grid in px
  const gridWidth = totalCols * (cellSize + cellGap) - cellGap;
  const gridHeight = numRows * (cellSize + cellGap) - cellGap;

  return (
    <div className="min-h-screen bg-background p-4 flex justify-center items-center">
      <Card className="bg-background text-foreground w-full max-w-5xl">
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

          <div style={{ position: 'relative', width: gridWidth }}>
            {/* Month labels (absolute‐positioned) */}
            <div style={{ position: 'relative', height: 15, marginBottom: 4 }}>
              {monthLabels()}
            </div>

            {/* The grid itself */}
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

            {/* Legend row – from 0% to 100% in GitHub color scale */}
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
};

export default YearProgress;
