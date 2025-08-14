import React from 'react';

interface TimerProps {
  timeRemaining: number;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = (seconds: number): string => {
    if (seconds <= 300) return 'text-red-600'; // Last 5 minutes
    if (seconds <= 600) return 'text-yellow-600'; // Last 10 minutes
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Time Remaining</h2>
        <div className={`text-4xl font-bold ${getTimeColor(timeRemaining)}`}>
          {formatTime(timeRemaining)}
        </div>
        {timeRemaining <= 300 && (
          <p className="text-red-600 text-sm mt-2 font-medium">
            ⚠️ Less than 5 minutes remaining!
          </p>
        )}
      </div>
    </div>
  );
}; 