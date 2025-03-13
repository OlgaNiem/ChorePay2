import { Head, Link, usePage } from '@inertiajs/react';
import Screen from '@/components/welcomePage/Screen';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

interface Family {
    id: number;
    name: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    family?: Family | null; // Добавляем тип для family
}

const FamilyOptions = () => {
    const { auth, family } = usePage<PageProps>().props;

    useEffect(() => {
        if (!auth?.user) {
            router.visit(route('login'));
        }
    }, [auth]);

    return (
        <Screen>
            <div className="flex min-h-screen flex-col items-center justify-center p-6 text-[#EDEDEC]">
                <Head title="Family Options" />
                <h1 className="text-2xl font-semibold">Family Options</h1>

                <div className="mt-6 flex flex-col gap-6 items-center">
                    <Link href={route('create-family')}>
                        <Button className="w-full py-3 text-lg">Create Family</Button>
                    </Link>

                    <Link href={route('join-family')}>
                        <Button className="w-full py-3 text-lg">Join Family Member</Button>
                    </Link>

                    {family && (
                        <Link href={route('return-family')}>
                            <Button className="w-full py-3 text-lg">Return to Your Family</Button>
                        </Link>
                    )}
                </div>
            </div>
        </Screen>
    );
};

export default FamilyOptions;
