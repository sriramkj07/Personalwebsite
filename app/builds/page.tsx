"use client";

import React, { useState } from 'react';
import { LayoutGrid, LayoutList, Timer, Plane, Stamp } from 'lucide-react';

export const metadata = {
  title: 'Builds - Sriram Kothandaraman'
};

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
];

const GridLayout = () => (
  <div className="grid grid-cols-2 gap-6">
    {projects.map((project, index) => (
      <div key={index} className="border rounded-lg p-6 relative min-h-[200px]">
        <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          {project.icon}
        </div>
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <span className="absolute bottom-6 right-6 text-blue-600 text-2xl">→</span>
      </div>
    ))}
  </div>
);

const ListLayout = () => (
  <div className="space-y-6">
    {projects.map((project, index) => (
      <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <a href={project.link} className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          View Project →
        </a>
      </div>
    ))}
  </div>
);

export default function Builds() {
  const [viewType, setViewType] = useState('list');

  return (
    <div className="min-h-screen bg-white text-black p-8 md:p-16 lg:p-24 font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Builds</h1>
          
          <div className="bg-gray-100 p-1 rounded-full flex gap-1">
            <button
              onClick={() => setViewType('list')}
              className={`p-2 rounded-full transition-colors ${
                viewType === 'list' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <LayoutList size={20} />
            </button>
            <button
              onClick={() => setViewType('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewType === 'grid' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-200'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>

        {viewType === 'list' && (
          <p className="text-gray-600">
            A collection of things I've built, from small weekend projects to more substantial applications.
          </p>
        )}
        
        {viewType === 'grid' ? <GridLayout /> : <ListLayout />}
      </div>
    </div>
  );
}
