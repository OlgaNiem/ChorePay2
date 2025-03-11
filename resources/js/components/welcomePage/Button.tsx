import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label = 'Start Now', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer w-44 h-11 px-2 rounded-lg shadow-md bg-[#ffd500] text-black text-lg font-medium outline-none hover:opacity-90"
    >
      {label}
    </button>
  );
};

export default Button;
