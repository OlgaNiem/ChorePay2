import React from 'react';

const TextSubtitle = ({ text }: { text: string }) => {
  return (
    <p className="text-[#ffd500] text-xl text-center">
      {text}
    </p>
  );
};

export default TextSubtitle;
