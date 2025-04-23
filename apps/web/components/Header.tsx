import React from 'react';
import { BellIcon, Cog6ToothIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Pill } from './Pill';
import { Button } from './Button';

export const Header: React.FC = () => (
  <>
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-[#001B33] flex items-center justify-center">
          {/* Inline hummingbird SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15 8H9L12 2Z" />
          </svg>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-700">
            Welcome back, <span className="text-primary-blue">Sarah</span>
          </p>
          <p className="text-sm text-gray-500">Let’s automate your business today</p>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search workflows..."
            className="w-[240px] h-[40px] pl-10 pr-3 rounded-full border border-gray-200 focus:outline-none"
          />
        </div>
        <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 space-x-2">
          {/* coins icon placeholder */}
          <span>🪙</span>
          <span>125</span>
          <button className="w-4 h-4 bg-gray-200 rounded text-xs flex items-center justify-center">+</button>
        </div>
        <button className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center">
          <BellIcon className="w-4 h-4 text-gray-500" />
        </button>
        <button className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center">
          <Cog6ToothIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </header>
    <hr className="border-gray-200" />
  </>
);
