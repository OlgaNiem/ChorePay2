import { Head, Link } from '@inertiajs/react';
import TextTitle from '@/components/welcomePage/TextTitle';
import TextSubtitle from '@/components/welcomePage/TextSubtitle';
import Image from '@/components/welcomePage/Image';
import Button from '@/components/welcomePage/Button';
import Screen from '@/components/welcomePage/Screen';

export default function Welcome() {
    
    return (
        <Screen>
            <Head title="ChorePay">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center p-6 text-[#EDEDEC]">
                <div className="mb-5">
                    <TextTitle text="ChorePay" />
                </div>
                <div className="mb-5">
                    <TextSubtitle text="Little tasks, big rewards!" />
                </div>
                <div className="my-11">
                    <Image />
                </div>
                <div className="mt-6">
                    <Link href={route('chooseRole')}>
                        <Button label="Start Now" />
                    </Link>
                </div>
            </div>
        </Screen>
    );
}
