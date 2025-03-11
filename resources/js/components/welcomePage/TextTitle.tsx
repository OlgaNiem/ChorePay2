import React from 'react';

const TextTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="text-[#ffd500] text-4xl font-bold text-center">
      {text}
    </h1>
  );
};

export default TextTitle;
