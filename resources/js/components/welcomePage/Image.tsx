const defaultProps = {
  image: '/welcome.png',
};

const Image = ({ image }: { image?: string }) => {
  return (
    <div
      className="
        w-full 
        max-w-2xl 
        h-[300px] 
        sm:h-[350px] 
        md:h-[450px] 
        lg:h-[480px] 
        xl:h-[550px] 
        bg-[center_10%] 
        bg-cover 
        bg-no-repeat 
        rounded-xl 
        mx-auto
      "
      style={{ backgroundImage: `url(${image ?? defaultProps.image})` }}
    />
  );
};

export default Image;
