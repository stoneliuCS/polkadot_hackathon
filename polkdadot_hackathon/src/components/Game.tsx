"use client"
import React from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['Get Ready...', 'For...', 'The...', 'Greatest Game of All Time!'];

const TransitionText = ({ time } : any ) => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      time, 
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <h1 className='text-9xl'>
      <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
    </h1>
  );
};

export default TransitionText