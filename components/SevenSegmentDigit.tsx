import React from 'react';

interface SevenSegmentDigitProps {
  value: number | string; // 0-9 or empty/dash if needed
  color?: string;
  inactiveColor?: string;
  size?: number;
}

const SevenSegmentDigit: React.FC<SevenSegmentDigitProps> = ({
  value,
  color = '#60a5fa', // Tailwind blue-400 default
  inactiveColor = '#172554', // Tailwind blue-950 default (very dark blue)
  size = 60,
}) => {
  // Segment definitions using standard A-G notation
  // Grid: 10x20
  // Coordinates are designed to share vertices, eliminating gaps between segments.
  // Thickness: 2 units (approx)
  
  const segments = {
    a: "M 1,1 L 2,0 L 8,0 L 9,1 L 8,2 L 2,2 Z",
    b: "M 9,1 L 10,2 L 10,9 L 9,10 L 8,9 L 8,2 Z",
    c: "M 9,10 L 10,11 L 10,18 L 9,19 L 8,18 L 8,11 Z",
    d: "M 1,19 L 2,18 L 8,18 L 9,19 L 8,20 L 2,20 Z",
    e: "M 1,10 L 2,11 L 2,18 L 1,19 L 0,18 L 0,11 Z",
    f: "M 1,1 L 2,2 L 2,9 L 1,10 L 0,9 L 0,2 Z",
    g: "M 1,10 L 2,9 L 8,9 L 9,10 L 8,11 L 2,11 Z",
  };

  // Map digits to active segments
  const digitMap: Record<string, string[]> = {
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'g', 'e', 'd'],
    '3': ['a', 'b', 'g', 'c', 'd'],
    '4': ['f', 'g', 'b', 'c'],
    '5': ['a', 'f', 'g', 'c', 'd'],
    '6': ['a', 'f', 'e', 'd', 'c', 'g'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g'],
    '-': ['g'], // Dash
    ' ': [], // Empty
  };

  const activeSegments = digitMap[String(value)] || [];

  return (
    <svg
      width={size}
      height={size * 2} // Updated to 2.0 to match 10:20 coordinate aspect ratio
      viewBox="0 0 10 20"
      className="inline-block transform skew-x-[-5deg]" // Slight italic for digital look
      style={{ filter: `drop-shadow(0 0 ${size * 0.15}px ${color})` }}
    >
      {Object.entries(segments).map(([key, path]) => (
        <path
          key={key}
          d={path}
          fill={activeSegments.includes(key) ? color : inactiveColor}
          fillOpacity={activeSegments.includes(key) ? 1 : 0.15}
        />
      ))}
    </svg>
  );
};

export default SevenSegmentDigit;