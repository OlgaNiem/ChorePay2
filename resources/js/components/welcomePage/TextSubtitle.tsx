const TextSubtitle = ({ text }: { text: string }) => {
  return (
    <p className="text-[#ffd500] text-lg sm:text-xl text-center font-quicksand">
      {text}
    </p>
  );
};

export default TextSubtitle;
