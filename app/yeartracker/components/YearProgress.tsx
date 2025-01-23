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
    // If localStorage is unavailable, return a fallback
    return {
      getItem: () => null,
      setItem: () => null
    };
  }
};

// Utility: how many days have elapsed in the year so far?
const getTotalDaysPassed = (now: Date) => {
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - startOfYear.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

const YearProgress = () => {
  const storage = getStorageWithFallback();

  // Initial progress state
  const getInitialState = (): YearProgressState => {
    const now = new Date();
    const totalDaysPassed = getTotalDaysPassed(now);
    const completeDays = Math.floor(totalDaysPassed);
    const partialDay = totalDaysPassed - completeDays;

    return {
      daysElapsed: completeDays,
      currentDayProgress: partialDay,
      progress: (totalDaysPassed / 365) * 100, // rough % ignoring leap years
      lastUpdate: now.toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  };

  const [state, setState] = useState<YearProgressState>(getInitialState);

  // Recompute state every minute
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

      setState({
        daysElapsed: completeDays,
        currentDayProgress: partialDay,
        progress: (diff / totalTime) * 100,
        lastUpdate: now.toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });

      storage?.setItem(STORAGE_KEY, JSON.stringify(state));
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

  // We’ll do 7 rows (days of week) × up to 53 columns (weeks)
  const numRows = 7;
  const numCols = 53; // enough for an entire year
  // Each cell is roughly 1em wide/tall (plus gap) – adjust to taste:
  const cellSize = 14; // px
  const cellGap = 4;   // px

  // Figure out how many days from Jan 1 to the first day of the year’s first column
  const currentYear = new Date().getFullYear();
  const firstDayOffset = new Date(currentYear, 0, 1).getDay(); 
  // By default Sunday=0, Monday=1, etc. So if year starts on a Wednesday, we skip 3 cells.

  // A helper to compute the color “intensity” for a given day index
  const getDayIntensity = (dayNumber: number): string => {
    if (dayNumber < state.daysElapsed) {
      // fully in the past
      return 'bg-green-600';
    }
    if (dayNumber === state.daysElapsed) {
      // part of today
      const intensity = Math.floor(state.currentDayProgress * 4);
      switch (intensity) {
        case 0
