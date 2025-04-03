import React from 'react';

const Ficha = ({ position }) => {
  const style = {
    top: `${position.top}%`,
    left: `${position.left}%`,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div
      className="absolute z-30 w-[1.5vw] h-[1.5vw] rounded-full bg-red-500"
      style={style}
    />
  );
};

export default Ficha;
