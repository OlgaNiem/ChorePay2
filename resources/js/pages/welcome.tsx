import { Head, Link } from '@inertiajs/react';
import TextTitle from '@/components/welcomePage/TextTitle';
import TextSubtitle from '@/components/welcomePage/TextSubtitle';
import Image from '@/components/welcomePage/Image';
import Button from '@/components/welcomePage/Button';

export default function Welcome() {
  return (
    <>
      <Head title="ChorePay" />

      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-[#EDEDEC] bg-[#161223]">
        <div className="mb-5">
          <TextTitle text="ChorePay" />
        </div>
        <div className="mb-5">
          <TextSubtitle text="Little tasks, big rewards!" />
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <Image />
        </div>
        <div className="mt-6">
          <Link href={route('chooseRole')}>
            <Button label="Start Now" />
          </Link>
        </div>
      </div>
    </>
  );
}
