import { Head, Link } from '@inertiajs/react';
import Screen from '@/components/welcomePage/Screen';

const ChooseRole = () => {
  return (
    <Screen>
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-[#EDEDEC] bg-[url('/bg1.png')] bg-cover bg-center">
        <Head title="Choose Role">
          <link rel="preconnect" href="https://fonts.bunny.net" />
          <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Head>

        <div className="mb-5 text-center">
          <h1 className="text-[28px] font-[500] leading-[28px] font-poppins">
            Are you a parent or a child?
          </h1>
        </div>

        <div className="mt-6 flex flex-col gap-6 items-center">
          <Link
            href={route('login')}
            className="cursor-pointer w-[329px] h-[120px] px-2 border-2 border-[#ffd700] bg-[#809eff] text-black font-semibold text-lg rounded-lg shadow-md hover:opacity-90 flex flex-col items-center justify-center text-center"
          >
            <span>I am a parent</span>
            <p className="mt-2 text-center text-[#090a0e] text-sm leading-[20px] font-quicksand">Complete tasks, earn rewards, and be a hero!</p>
          </Link>

          <Link
            href={route('login')}
            className="cursor-pointer w-[329px] h-[120px] px-2 border-2 border-[#66aedd] bg-[#F9CC18] text-black font-semibold text-lg rounded-lg shadow-md hover:opacity-90 flex flex-col items-center justify-center text-center"
          >
            <span>I am a child</span>
            <p className="mt-2 text-center text-[#090a0e] text-sm leading-[20px] font-quicksand">Help kids build skills with fun tasks and rewards.</p>
          </Link>
        </div>
      </div>
    </Screen>
  );
};

export default ChooseRole;
