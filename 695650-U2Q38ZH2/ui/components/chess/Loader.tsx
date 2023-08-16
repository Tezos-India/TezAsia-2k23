import React from 'react';

type LoaderProps = {
  color?: string;
  size?: string | number;
}

function Loader({ color = '#444', size = '40px' }: LoaderProps) {
  const style = {
    borderTopColor: color,
    borderLeftColor: color,
    width: size,
    height: size
  };

  return (
    <div className='loader-container'>
      <div className='loader' style={style}></div>
    </div>
  );
}

export default Loader;
