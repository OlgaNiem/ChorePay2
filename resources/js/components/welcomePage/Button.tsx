import React from 'react';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label = 'Start Now', onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-[180px] h-[44px]
        sm:w-[200px] sm:h-[48px]
        md:w-[220px] md:h-[50px]
        px-2
        rounded-md
        shadow-[0_2px_8px_rgba(0,0,0,0.16)]
        bg-[#ffd500]
        text-black
        text-[18px] sm:text-[20px] md:text-[22px]
        font-poppins font-bold
        leading-[23px]
        outline-none
        hover:brightness-95
        transition
      "
    >
      {label}
    </button>
  );
};

export default Button;
