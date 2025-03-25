import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginForm } from '@/types';


interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen bg-[#F4EDEC] flex flex-col justify-start pt-0">
                <div className="
                        w-full 
                        h-[250px] 
                        sm:h-[300px] 
                        md:h-[400px] 
                        lg:h-[480px] 
                        xl:h-[550px] 
                        bg-cover 
                        bg-[center_30%] 
                        bg-no-repeat 
                        rounded-b-[8px]"
                    
                    style={{ backgroundImage: "url('/login.png')" }}
                    />

                <div className="mt-14 w-full max-w-sm px-8 mx-auto">
                <h1 className="text-3xl font-bold text-center text-neutral-900 font-poppins leading-tight">
                    Log In
                </h1>
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="space-y-4">
                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Email"
                                    className="h-11 px-2 rounded-md shadow-sm bg-[#fdfdfd] placeholder:text-slate-400 font-medium text-sm"
                                />
                                <InputError message={errors.email} />
                            </div>

                        </div>

                            <div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    className="h-12 px-2 rounded-md shadow-sm bg-[#fdfdfd] placeholder:text-slate-400 font-medium text-sm"
                                />
                                <InputError message={errors.password} />

                                {canResetPassword && (
                                    <div className="text-right mt-1">
                                        <TextLink
                                            href={route('password.request')}
                                            className="text-xs text-[#4a4c7f] font-quicksand"
                                        >
                                            Forgot your password?
                                        </TextLink>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                />
                                <Label htmlFor="remember" className="text-sm font-quicksand">
                                    Remember me
                                </Label>
                            </div>
                        <Button
                            type="submit"
                            className="w-full h-11 rounded-md bg-[#f9cc18] text-black font-bold shadow-md hover:bg-yellow-400"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Log In
                        </Button>
                    </form>

                    <div className="mt-6 text-base font-quicksand flex justify-center items-center">
                        <span className="text-[#090a0e]">Don't have an account?</span>
                        <TextLink
                            href={route('register')}
                            className="text-[#4a4c7f] font-medium ml-4 sm:ml-8 md:ml-12 lg:ml-20"
                        >
                            Sign up
                        </TextLink>
                    </div>


                    {status && (
                        <div className="mt-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
