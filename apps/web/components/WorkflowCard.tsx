import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { StarRating } from './StarRating';
import { Button } from './Button';

interface WorkflowCardProps {
  title: string;
  rating: number;
  category: string;
  description: string;
  timeSaved: number;
  credits: number;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ title, rating, category, description, timeSaved, credits }) => (
  <div className="bg-white rounded shadow p-6 flex flex-col justify-between w-[240px] h-[260px] hover:shadow-lg hover:-translate-y-0.5 transition-transform transition-shadow">
    <div>
      <div className="flex justify-between items-start">
        <h3
          className="text-base font-semibold text-gray-700 overflow-hidden" 
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {title}
        </h3>
        <StarRating rating={rating} />
      </div>
      <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded mt-2">
        {category}
      </span>
      <p
        className="text-sm text-gray-500 mt-2 overflow-hidden"
        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
      >
        {description}
      </p>
    </div>
    <div>
      <div className="flex items-center text-sm text-gray-500 space-x-1 mt-4">
        <ClockIcon className="w-4 h-4" aria-hidden="true" />
        <span>Saves {timeSaved} hrs/week</span>
        <span className="mx-1">·</span>
        <CurrencyDollarIcon className="w-4 h-4" aria-hidden="true" />
        <span>{credits} credits</span>
      </div>
      <Button variant="primary" className="mt-3 w-full h-10 text-sm font-semibold flex items-center justify-center space-x-2">
        <span>Run workflow</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" /></svg>
      </Button>
    </div>
  </div>
);

export default WorkflowCard;
