"use client";
import React, { useState } from 'react';
import { LayoutGrid, LayoutList, Timer, Plane, Stamp } from 'lucide-react';

const projects = [
  {
    title: "Year Tracker",
    description: "A live year tracker counter that shows you how much percentage of the year is done and how much is remaining. Built with Next.js and React.",
    link: "/yeartracker",
    icon: <Timer className="w-6 h-6" />
  },
  {
    title: "Payanam",
    description: "An AI travel agent to help you plan, book, and supercharge your adventure",
    link: "https://payanamhq.com/",
    icon: <Plane className="w-6 h-6" />
  },
  {
    title: "Visa Clarity",
    description: "A high level overview of Visas and their processes",
    link: "https://visaclarity.com/",
    icon: <Stamp className="w-6 h-6" />
  }
  {
    title: "Whisper GUI",
    description: "A modern, user-friendly GUI for OpenAI's Whisper speech-to-text model",
    link: "https://github.com/sriramkj07/GUI-for-Whisper?tab=readme-ov-file",
    icon: <Stamp className="w-6 h-6" />
  }
];

const GridLayout = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {projects.map((project, index) => (
      <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 relative hover:shadow-lg transition-shadow">
        <div className="bg-gray-100 dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center mb-4">
          {project.icon}
        </div>
        <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">{project.description}</p>
        <a 
          href={project.link} 
          className="absolute bottom-6 right-6 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xl">→</span>
        </a>
      </div>
    ))}
  </div>
);

const ListLayout = () => (
  <div className="space-y-6">
    {projects.map((project, index) => (
      <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
        <a 
          href={project.link} 
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project →
        </a>
      </div>
    ))}
  </div>
);

export default function Builds() {
  const [viewType, setViewType] = useState('list');

  return (
    <main className="w-full max-w-2xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Builds</h1>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full flex gap-1">
          <button
            onClick={() => setViewType('list')}
            className={`p-2 rounded-full transition-colors ${
              viewType === 'list' 
                ? 'bg-white dark:bg-gray-700 shadow-sm' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label="List view"
          >
            <LayoutList size={20} />
          </button>
          <button
            onClick={() => setViewType('grid')}
            className={`p-2 rounded-full transition-colors ${
              viewType === 'grid' 
                ? 'bg-white dark:bg-gray-700 shadow-sm' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        A collection of things I've built, from small weekend projects to more substantial applications.
      </p>
      
      {viewType === 'grid' ? <GridLayout /> : <ListLayout />}
    </main>
  );
}
