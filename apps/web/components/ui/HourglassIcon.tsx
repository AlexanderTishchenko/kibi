
import React from 'react';

interface HourglassIconProps {
  className?: string;
  fillPercentage?: number; // 0 to 100
  size?: number;
}

const HourglassIcon: React.FC<HourglassIconProps> = ({ 
  className = "", 
  fillPercentage = 50,
  size = 40 
}) => {
  // Ensure fill percentage is between 0 and 100
  const fill = Math.max(0, Math.min(100, fillPercentage));
  
  return (
    <div className={`relative ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-slow"
      >
        {/* Hourglass outline */}
        <path 
          d="M12 2V22M7 2H17M7 22H17" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M17 2H7C7 4.5 7.8 7.2 9.5 9C11.2 10.8 12 13.5 12 16C12 16.5 11.9 17 11.7 17.5C11.4 18.5 11 19.5 10 20.4C9.2 21.1 8.3 21.6 7 22H17C15.8 21.6 14.8 21.1 14 20.4C13 19.5 12.6 18.5 12.3 17.5C12.1 17 12 16.5 12 16C12 13.5 12.8 10.8 14.5 9C16.2 7.2 17 4.5 17 2Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Sand fill - top chamber (emptying) */}
        <path 
          d="M12 2C14.5 2.5 16 5 16 7C16 9 14.5 11 12 12"
          stroke="none"
          fill="currentColor"
          opacity={1 - (fill / 100)}
        />
        
        {/* Sand fill - bottom chamber (filling) */}
        <path 
          d="M12 12C9.5 13 8 15 8 17C8 19 9.5 21.5 12 22"
          stroke="none"
          fill="currentColor"
          opacity={fill / 100}
        />
      </svg>
      
      {/* Animated particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-kb-teal animate-pulse-subtle"></div>
      </div>
    </div>
  );
};

export default HourglassIcon;
