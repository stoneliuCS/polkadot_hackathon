import React from 'react';

const LeftStickman = () => {
  return (
    <svg width="350" height="500" viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
      {/* Left Stickman */}
      <circle cx="50" cy="50" r="10" stroke="black" strokeWidth="2" fill="none" />
      <line x1="50" y1="60" x2="50" y2="100" stroke="black" strokeWidth="2" />
      <line x1="50" y1="70" x2="30" y2="90" stroke="black" strokeWidth="2" />
      <line x1="50" y1="70" x2="70" y2="90" stroke="black" strokeWidth="2" />
      <line x1="50" y1="100" x2="40" y2="130" stroke="black" strokeWidth="2" />
      <line x1="50" y1="100" x2="60" y2="130" stroke="black" strokeWidth="2" />
      {/* Left Stickman Sword */}
      <line x1="30" y1="90" x2="10" y2="80" stroke="black" strokeWidth="2" />
    </svg>
  );
};

export default LeftStickman;
