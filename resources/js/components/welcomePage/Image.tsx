const defaultProps = {
  image: '/welcome.png',
};

const Image = ({ image }: { image?: string }) => {
  return (
    <div
      className="
        w-full 
        max-w-2xl 
        h-[320px] 
        sm:h-[370px] 
        md:h-[450px] 
        lg:h-[500px] 
        xl:h-[550px] 
        bg-[center_10%] 
        bg-cover 
        bg-no-repeat 
        rounded-xl 
        mx-auto
        transition-all 
        duration-300 
        ease-in-out
      "
      style={{ backgroundImage: `url(${image ?? defaultProps.image})` }}
    />
  );
};

export default Image;
