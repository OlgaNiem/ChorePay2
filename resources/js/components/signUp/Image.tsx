import React from 'react';

type ImageProps = {
  image?: string;
};

const Image: React.FC<ImageProps> = ({ image }) => {
  return (
    <div
      className="absolute top-0 left-0 w-[375px] h-[257px] rounded-lg bg-cover bg-center"
      style={{
        backgroundImage: `url(${image ?? '/signUp.png'})`,
      }}
    />
  );
};

export default Image;
