import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import TextTitle from '@/components/welcomePage/TextTitle';
import TextSubtitle from '@/components/welcomePage/TextSubtitle';
import Image from '@/components/welcomePage/Image';
import Button from '@/components/welcomePage/Button';
import Screen from '@/components/welcomePage/Screen';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
<Screen>
            <Head title="Welcome">
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
                <nav className="mt-6 flex gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#3E3E3A] px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#3E3E3A] px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </Screen>
    );
}
