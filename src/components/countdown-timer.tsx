
"use client";

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetTimestamp: number; // Expect a Unix timestamp (milliseconds)
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (targetTimestamp <= 0) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTimestamp - now;
      let newTimeLeft = { hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        const totalHours = Math.floor(difference / (1000 * 60 * 60));
        const totalMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const totalSeconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        newTimeLeft = {
          hours: totalHours,
          minutes: totalMinutes,
          seconds: totalSeconds,
        };
      }
      setTimeLeft(newTimeLeft);
    };
    
    calculateTimeLeft(); // Initial calculation
    const timerInterval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerInterval);
  }, [targetTimestamp]); 

  const formatUnit = (value: number, unit: string) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold text-primary bg-background/50 px-2 py-1 rounded-md">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs uppercase text-muted-foreground mt-1">{unit}</span>
    </div>
  );

  if (targetTimestamp <=0 ) { // Should ideally not be needed if parent passes valid target
     return (
        <div className="flex space-x-2 md:space-x-4 justify-center">
            {formatUnit(0, 'Jam')}
            {formatUnit(0, 'Menit')}
            {formatUnit(0, 'Detik')}
        </div>
     );
  }


  return (
    <div className="flex space-x-2 md:space-x-4 justify-center">
      {formatUnit(timeLeft.hours, 'Jam')}
      {formatUnit(timeLeft.minutes, 'Menit')}
      {formatUnit(timeLeft.seconds, 'Detik')}
    </div>
  );
};

export default CountdownTimer;
