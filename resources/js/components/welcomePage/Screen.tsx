import React from 'react';

const Screen = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-[#161223]">{children}</div>;
};

export default Screen;
