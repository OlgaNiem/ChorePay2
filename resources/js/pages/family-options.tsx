import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import Screen from '@/components/welcomePage/Screen';
import type { PageProps } from '@/types';

const FamilyOptions = () => {
  const { family } = usePage<PageProps>().props as PageProps;

  return (
    <Screen>
      <Head title="Family Options" />

      <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-[url('/family-options.png')] bg-cover bg-center bg-no-repeat font-poppins">
        <div className="w-full max-w-sm flex flex-col items-center gap-8">
            <div className="flex flex-col gap-10 sm:gap-[70px] w-full">
                <div className="relative">
                    <Link href={route('create-family')}>
                    <Button className="w-full h-[69px] pr-10 bg-[#FFD500] text-black text-sm font-bold rounded-md shadow-md hover:bg-yellow-400">
                        Create Family
                    </Button>
                    </Link>
                    <img
                    src="/control_point.svg"
                    alt="Create Icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                </div>

                <div className="relative">
                    <Link href={route('join-family')}>
                    <Button className="w-full h-[69px] pr-10 bg-[#FFD500] text-black text-sm font-bold rounded-md shadow-md hover:bg-yellow-400">
                        Join Family Member
                    </Button>
                    </Link>
                    <img
                    src="/control_point_duplicate.svg"
                    alt="Join Icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                </div>

                {!!family && (
                    <div className="relative">
                    <Link href={route('return-family')}>
                        <Button className="w-full h-[69px] pr-10 bg-[#FFD500] text-black text-sm font-bold rounded-md shadow-md hover:bg-yellow-400">
                        Return to Your Family
                        </Button>
                    </Link>
                    <img
                        src="/undo.svg"
                        alt="Return Icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    />
                    </div>
                )}
                </div>
            </div>
      </div>
    </Screen>
  );
};

export default FamilyOptions;
