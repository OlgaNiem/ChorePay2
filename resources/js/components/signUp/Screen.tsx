import React, { ReactNode } from 'react';

type ScreenProps = {
  children: ReactNode;
};

const Screen: React.FC<ScreenProps> = ({ children }) => {
  return (
    <div className="bg-[#f4edee] min-h-screen">
      {children}
    </div>
  );
};

export default Screen;
