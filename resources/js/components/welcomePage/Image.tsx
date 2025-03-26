
const defaultProps = {
  image: '/welcomeimg.png',
};

const Image = ({ image }: { image?: string }) => {
  return (
    <div
      className="w-[358px] h-[334px] rounded-lg bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${image ?? defaultProps.image})` }}
    />
  );
};

export default Image;
