import React, { useState, useEffect } from 'react';
import SevenSegmentDigit from './SevenSegmentDigit';
import { TimeLeft } from '../types';

const CountdownDisplay: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Target Date: May 29, 2026, 1:46 pm
  // Note: Month is 0-indexed in JS Date (0=Jan, 4=May)
  // 1:46 PM is 13:46
  const TARGET_DATE = new Date(2026, 4, 29, 13, 46, 0).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [TARGET_DATE]);

  // Helper to split number into digits
  const getDigits = (num: number, pad: number) => {
    const str = num.toString().padStart(pad, '0');
    return str.split('').map(d => parseInt(d));
  };

  const Separator = () => (
    <div className="flex flex-col justify-center gap-3 md:gap-6 mx-2 sm:mx-3 md:mx-5 opacity-80">
      <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]"></div>
      <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]"></div>
    </div>
  );

  // Adjusted size logic: Mobile 30 (was 35), Tablet 50 (was 60), Desktop 75 (was 85)
  const digitSize = typeof window !== 'undefined' && window.innerWidth < 640 ? 30 : 
                    typeof window !== 'undefined' && window.innerWidth < 1024 ? 50 : 75;

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-black/20 backdrop-blur-sm border border-blue-900/30 shadow-2xl shadow-blue-900/20">
      
      {/* Display Container */}
      <div className="flex items-center">
        
        {/* Days */}
        <div className="flex">
          {getDigits(timeLeft.days, 3).map((d, i) => (
            <div key={`d-${i}`} className="mx-0.5 sm:mx-1 md:mx-2">
              <SevenSegmentDigit value={d} size={digitSize} />
            </div>
          ))}
        </div>

        {/* Separator - Hidden label logic, purely visual */}
        <Separator />

        {/* Hours */}
        <div className="flex">
          {getDigits(timeLeft.hours, 2).map((d, i) => (
            <div key={`h-${i}`} className="mx-0.5 sm:mx-1 md:mx-2">
              <SevenSegmentDigit value={d} size={digitSize} />
            </div>
          ))}
        </div>

        <Separator />

        {/* Minutes */}
        <div className="flex">
          {getDigits(timeLeft.minutes, 2).map((d, i) => (
            <div key={`m-${i}`} className="mx-0.5 sm:mx-1 md:mx-2">
              <SevenSegmentDigit value={d} size={digitSize} />
            </div>
          ))}
        </div>

        <Separator />

        {/* Seconds */}
        <div className="flex">
          {getDigits(timeLeft.seconds, 2).map((d, i) => (
            <div key={`s-${i}`} className="mx-0.5 sm:mx-1 md:mx-2">
              <SevenSegmentDigit value={d} size={digitSize} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CountdownDisplay;