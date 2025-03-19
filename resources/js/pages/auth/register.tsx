import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type User = {
    id: number;
    name: string;
    email: string;
};

type PageProps = {
    role?: string;
    auth?: {
        user?: User;
    };
};

export default function Register() {
    const { role, auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: role || 'parent',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        if (auth?.user) {
            window.location.href = route('dashboard');
        }
    }, [auth]);

    return (
        <div className="bg-[#f4edee] min-h-screen flex flex-col justify-center items-center">
            <div 
                className="w-full h-[257px] bg-cover bg-center rounded-lg mb-6" 
                style={{ backgroundImage: 'url(/signUp.png)' }}
            ></div>
            <div className="text-[#030303] text-4xl font-bold leading-10 text-center mb-6 font-[Poppins]">
                Sign Up
            </div>

            <form className="flex flex-col gap-6 w-full max-w-md px-8" onSubmit={submit}>
                <div className="grid gap-6">
                    <Input type="hidden" value={data.role} name="role" />

                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-[#4a4c7f] text-[12px] font-[Quicksand] font-[400] leading-[16px]">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            className="mt-2 w-full h-[46px] px-2 border-0 rounded-[6px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] bg-[#fdfdfd] text-[#94a3b8] text-[14px] font-[Quicksand] font-medium"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#4a4c7f] text-[12px] font-[Quicksand] font-[400] leading-[16px]">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                            className="mt-2 w-full h-[46px] px-2 border-0 rounded-[6px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] bg-[#fdfdfd] text-[#94a3b8] text-[14px] font-[Quicksand] font-medium"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[#4a4c7f] text-[12px] font-[Quicksand] font-[400] leading-[16px]">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                            className="mt-2 w-full h-[46px] px-2 border-0 rounded-[6px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] bg-[#fdfdfd] text-[#94a3b8] text-[14px] font-[Quicksand] font-medium"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-[#4a4c7f] text-[12px] font-[Quicksand] font-[400] leading-[16px]">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                            className="mt-2 w-full h-[46px] px-2 border-0 rounded-[6px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] bg-[#fdfdfd] text-[#94a3b8] text-[14px] font-[Quicksand] font-medium"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-6 w-full h-[44px] px-2 border-0 rounded-[6px] shadow-[0px_2px_8px_rgba(0,0,0,0.12)] bg-[#809eff] text-[#000000] text-[14px] font-[Poppins] font-bold" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm mt-4">
                    Already have an account?{' '}
                    <TextLink href={route('login')} className="text-blue-500">
                        Log in
                    </TextLink>
                </div>
            </form>
        </div>
    );
}
