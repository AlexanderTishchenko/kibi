import React from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

export const KibiChatWidget: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  return (
    <div className="fixed bottom-8 right-8 w-[260px] h-[220px] bg-white rounded shadow flex flex-col">
      <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-gray-500">
        <XMarkIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <div className="h-10 bg-[#F4F4EE] px-3 flex items-center text-sm text-gray-700">
        Great choice! Let me help you with 'Analyze my workflow'
      </div>
      <div className="flex flex-col grow">
        <button className="flex items-center h-10 px-3 text-gray-700 text-sm">
          <PlusIcon className="w-3 h-3 mr-2" aria-hidden="true" />
          Analyze my workflow
        </button>
        <button className="flex items-center h-10 px-3 text-gray-700 text-sm border-t border-gray-200">
          <PlusIcon className="w-3 h-3 mr-2" aria-hidden="true" />
          Show me popular automations
        </button>
        <button className="flex items-center h-10 px-3 text-gray-700 text-sm border-t border-gray-200">
          <PlusIcon className="w-3 h-3 mr-2" aria-hidden="true" />
          How do I earn more credits?
        </button>
      </div>
    </div>
  );
};
