"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

const STORAGE_KEY = "yearProgressState"
const UPDATE_INTERVAL = 60000

const GITHUB_COLORS = [
 "#EBEDF0", // future, no activity
 "#c6e48b",
 "#7bc96f", 
 "#239a3b",
 "#196127", // darkest green
]

interface YearProgressState {
 daysElapsed: number
 currentDayProgress: number  
 progress: number
 lastUpdate: string
 timezone: string
}

const getStorageWithFallback = () => {
 if (typeof window === "undefined") return null
 try {
   return window.localStorage
 } catch {
   return { getItem: () => null, setItem: () => null }
 }
}

const getDaysElapsedThisYear = (now: Date) => {
 const year = now.getFullYear()
 const startOfYear = new Date(year, 0, 1)
 const diff = now.getTime() - startOfYear.getTime()
 return diff / (1000 * 60 * 60 * 24)
}

export default function YearProgress() {
 const storage = getStorageWithFallback()

 const getInitialState = (): YearProgressState => {
   const now = new Date()
   const totalDays = getDaysElapsedThisYear(now)
   const completeDays = Math.floor(totalDays)
   const partialDay = totalDays - completeDays
   return {
     daysElapsed: completeDays,
     currentDayProgress: partialDay,
     progress: (totalDays / 365) * 100,
     lastUpdate: now.toISOString(),
     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
   }
 }

 const [state, setState] = useState<YearProgressState>(getInitialState)
 const [containerWidth, setContainerWidth] = useState(0)

 const calculateProgress = () => {
   try {
     const now = new Date()
     const year = now.getFullYear()
     const startOfYear = new Date(year, 0, 1)
     const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999)

     const diff = now.getTime() - startOfYear.getTime()
     const totalTime = endOfYear.getTime() - startOfYear.getTime()
     const totalDaysPassed = diff / (1000 * 60 * 60 * 24)
     const completeDays = Math.floor(totalDaysPassed)
     const partialDay = totalDaysPassed - completeDays

     const newState: YearProgressState = {
       daysElapsed: completeDays,
       currentDayProgress: partialDay,
       progress: (diff / totalTime) * 100,
       lastUpdate: now.toISOString(),
       timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
     }

     setState(newState)
     storage?.setItem(STORAGE_KEY, JSON.stringify(newState))
   } catch (error) {
     console.error("Error calculating progress:", error)
     setState(getInitialState())
   }
 }

 useEffect(() => {
   calculateProgress()
   const timer = setInterval(calculateProgress, UPDATE_INTERVAL)
   return () => clearInterval(timer)
 }, [])

 useEffect(() => {
   const updateWidth = () => {
     const container = document.getElementById("year-progress-container")
     if (container) {
       setContainerWidth(container.offsetWidth)
     }
   }

   updateWidth()
   window.addEventListener("resize", updateWidth)
   return () => window.removeEventListener("resize", updateWidth)
 }, [])

 const numRows = 7
 const currentYear = new Date().getFullYear()
 const firstDayOffset = new Date(currentYear, 0, 1).getDay()
 const dec31 = new Date(currentYear, 11, 31)
 const dayNumberDec31 = Math.floor((dec31.getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24))
 const lastColIndex = Math.floor((dayNumberDec31 + firstDayOffset) / numRows)
 const totalCols = lastColIndex + 1

 const calculateCellSize = () => {
   const minCellSize = 8 
   const maxCellSize = 11
   const gap = 2
   const availableWidth = Math.max(280, containerWidth - 32)
   const calculatedSize = Math.floor((availableWidth - (totalCols - 1) * gap) / totalCols)
   return Math.min(Math.max(calculatedSize, minCellSize), maxCellSize)
 }

 const cellSize = calculateCellSize()
 const cellGap = 2

 const getCellColor = (dayNumber: number) => {
   if (dayNumber < state.daysElapsed) {
     return GITHUB_COLORS[4]
   } else if (dayNumber === state.daysElapsed) {
     const intensity = Math.floor(state.currentDayProgress * 4)
     const colorIndex = Math.min(4, Math.max(1, intensity + 1))
     return GITHUB_COLORS[colorIndex]
   } else {
     return GITHUB_COLORS[0]
   }
 }

 const formatDate = (dayNumber: number) => {
   const date = new Date(currentYear, 0, dayNumber + 1)
   return date.toLocaleDateString(undefined, {
     year: "numeric",
     month: "long", 
     day: "numeric",
   })
 }

 const generateGrid = () => {
   const rows = []
   for (let row = 0; row < numRows; row++) {
     const rowCells = []
     for (let col = 0; col < totalCols; col++) {
       const dayNumber = col * numRows + row - firstDayOffset
       if (dayNumber >= 0 && dayNumber <= dayNumberDec31) {
         const dateStr = formatDate(dayNumber)
         rowCells.push(
           <div
             key={`day-${dayNumber}`}
             className="rounded-sm transition-colors duration-200"
             style={{
               width: cellSize,
               height: cellSize,
               backgroundColor: getCellColor(dayNumber),
             }}
             title={dateStr}
           />
         )
       } else {
         rowCells.push(<div key={`empty-${row}-${col}`} style={{ width: cellSize, height: cellSize }} />)
       }
     }
     rows.push(
       <div key={`row-${row}`} style={{ display: "flex", gap: cellGap }}>
         {rowCells}
       </div>
     )
   }
   return rows
 }

 const monthLabels = () => {
   const labels = []
   for (let m = 0; m < 12; m++) {
     const firstOfMonth = new Date(currentYear, m, 1)
     if (firstOfMonth.getFullYear() !== currentYear) continue
     const dayIndex = Math.floor(
       (firstOfMonth.getTime() - new Date(currentYear, 0, 1).getTime()) / (1000 * 60 * 60 * 24)
     )
     const colIndex = Math.floor((dayIndex + firstDayOffset) / numRows)
     if (colIndex < 0 || colIndex >= totalCols) continue

     const leftOffset = colIndex * (cellSize + cellGap)
     const monthName = firstOfMonth.toLocaleString(undefined, { month: "short" })

     labels.push(
       <div
         key={`month-${m}`}
         className="absolute text-xs text-muted-foreground whitespace-nowrap"
         style={{
           left: leftOffset,
           top: 0,
         }}
       >
         {monthName}
       </div>
     )
   }
   return labels
 }

 const gridWidth = totalCols * (cellSize + cellGap) - cellGap
 const gridHeight = numRows * (cellSize + cellGap) - cellGap

 return (
   <div className="min-h-screen w-full flex items-center justify-center p-4">
     <Card className="w-full max-w-2xl bg-background text-foreground shadow-sm">
       <CardContent className="p-4 sm:p-6" id="year-progress-container">
         <div className="space-y-2">
           <div className="text-lg sm:text-xl font-medium">
             Year Progress – {state.progress.toFixed(2)}% Complete
           </div>
           <div className="text-sm text-muted-foreground">
             {Math.floor(state.daysElapsed / 7)} weeks elapsed • {52 - Math.floor(state.daysElapsed / 7)} weeks remaining
           </div>
           <div className="text-xs text-muted-foreground">
             Last updated: {new Date(state.lastUpdate).toLocaleString()}
             {state.timezone && ` (${state.timezone})`}
           </div>
         </div>

         <div className="mt-6 overflow-x-auto pb-4">
           <div className="min-w-[280px]" style={{ width: gridWidth }}>
             <div className="relative h-5 mb-1">{monthLabels()}</div>
             <div
               className="flex flex-col"
               style={{
                 gap: cellGap,
                 width: gridWidth,
                 height: gridHeight,
               }}
             >
               {generateGrid()}
             </div>

             <div className="flex items-center gap-2 justify-end mt-4">
               <span className="text-xs text-muted-foreground">Less</span>
               {GITHUB_COLORS.map((color, idx) => (
                 <div
                   key={`legend-${idx}`}
                   className="rounded-sm"
                   style={{
                     width: cellSize,
                     height: cellSize,
                     backgroundColor: color,
                   }}
                 />
               ))}
               <span className="text-xs text-muted-foreground">More</span>
             </div>
           </div>
         </div>
       </CardContent>
     </Card>
   </div>
 )
}
