import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const YearProgress = () => {
  const [state, setState] = useState({
    daysElapsed: 21,
    currentDayProgress: 0.5,
    progress: 5.75,
    lastUpdate: new Date().toISOString(),
    timezone: "America/Los_Angeles"
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getDayIntensity = (dayNumber) => {
    if (dayNumber < state.daysElapsed) return 'bg-green-600';
    if (dayNumber === state.daysElapsed) return 'bg-green-400';
    return 'bg-muted';
  };

  const generateGrid = () => {
    const days = [];
    const totalDays = 365;
    const daysPerRow = Math.ceil(totalDays / 52); // Approximately 7 days per row
    const totalRows = 52; // We want 52 rows for weeks
    
    for (let row = 0; row < totalRows; row++) {
      const weekDays = [];
      for (let day = 0; day < daysPerRow; day++) {
        const dayNumber = row * daysPerRow + day;
        if (dayNumber < totalDays) {
          weekDays.push(
            <div
              key={`day-${dayNumber}`}
              className={`w-3 h-3 rounded-sm ${getDayIntensity(dayNumber)} transition-colors duration-200`}
            />
          );
        }
      }
      days.push(
        <div key={`week-${row}`} className="flex flex-col gap-1">
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
              2 weeks elapsed • 50 weeks remaining
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last updated: 1/21/2025, 11:46:39 PM (America/Los_Angeles)
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
