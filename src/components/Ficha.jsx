import React from 'react';

const Ficha = ({ position }) => {
  return (
    <div
      className="absolute w-10 h-10 bg-yellow-400 rounded-full border-2 border-white shadow-lg transition-all duration-700 ease-in-out z-30"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Ficha;