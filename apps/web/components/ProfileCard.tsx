import React from 'react';
import { ProgressBar } from './ProgressBar';

const ProfileCard: React.FC = () => (
  <div className="bg-white rounded shadow p-5 w-[280px] h-[200px] flex flex-col justify-between">
    <div className="flex items-center space-x-4">
      <img src="https://via.placeholder.com/56" alt="Avatar" className="w-14 h-14 rounded-full" />
      <div>
        <p className="text-base font-semibold text-gray-700">Sarah</p>
        <div className="inline-flex items-center bg-[#F9F5FF] text-primary-blue text-xs font-bold px-2 py-0.5 rounded">
          Level 4
          <span className="ml-1">🏅</span>
        </div>
      </div>
    </div>
    <ProgressBar percent={65} labelLeft="Next Level" labelRight="65%" />
    <div className="flex space-x-4">
      <div className="bg-gray-100 rounded p-3 w-[90px] h-[56px] flex flex-col justify-center text-center">
        <p className="text-xs text-gray-500">⏱ Time Saved</p>
        <p className="text-sm font-semibold text-gray-700">42 hours</p>
      </div>
      <div className="bg-gray-100 rounded p-3 w-[90px] h-[56px] flex flex-col justify-center text-center">
        <p className="text-xs text-gray-500">$ Money Saved</p>
        <p className="text-sm font-semibold text-gray-700">$3,240</p>
      </div>
    </div>
  </div>
);

export default ProfileCard;
