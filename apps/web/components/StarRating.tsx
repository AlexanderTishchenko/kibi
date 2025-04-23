import React from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

interface StarRatingProps {
  rating: number; // 0-5
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
  <div className="flex space-x-1">
    {Array.from({ length: 5 }).map((_, i) =>
      i < rating ? (
        <StarSolid key={i} className="w-4 h-4 text-yellow-400" aria-hidden="true" />
      ) : (
        <StarOutline key={i} className="w-4 h-4 text-gray-200" aria-hidden="true" />
      )
    )}
  </div>
);
