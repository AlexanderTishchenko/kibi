import React from 'react';
import { ClipboardDocumentCheckIcon, LinkIcon, UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export const AccountSetupCard: React.FC = () => (
  <div className="bg-white rounded shadow p-5 w-[280px] h-[240px] flex flex-col">
    <div className="flex items-center space-x-2 text-gray-700 text-base font-semibold mb-4">
      <ClipboardDocumentCheckIcon className="w-5 h-5" aria-hidden="true" />
      <span>Account Setup</span>
    </div>
    <div className="flex flex-col space-y-4">
      <div className="flex items-center h-12 bg-white rounded px-3">
        <div className="w-8 h-8 flex items-center justify-center">
          <LinkIcon className="w-5 h-5 text-[#A4A4FF]" aria-hidden="true" />
        </div>
        <span className="text-gray-700 ml-2">Follow K.B on LinkedIn</span>
      </div>
      <div className="flex flex-col bg-white rounded px-3 py-2">
        <div className="flex items-center h-12">
          <div className="w-8 h-8 flex items-center justify-center">
            <CheckCircleIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
          </div>
          <span className="text-gray-700 ml-2">Complete your profile</span>
        </div>
        <p className="text-gray-500 text-xs ml-10">Add your job role and organisation</p>
      </div>
      <div className="flex items-center h-12 bg-white rounded px-3">
        <div className="w-8 h-8 flex items-center justify-center">
          <UserCircleIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
        </div>
        <span className="text-gray-700 ml-2">Upload a profile picture</span>
      </div>
    </div>
  </div>
);
