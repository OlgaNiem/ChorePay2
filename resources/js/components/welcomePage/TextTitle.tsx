const TextTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="text-[#ffd500] text-4xl sm:text-4xl lg:text-5xl font-bold text-center font-poppins leading-tight">
      {text}
    </h1>
  );
};

export default TextTitle;
