import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PageProps, RegisterForm } from '@/types';

export default function Register() {
    const { role } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="bg-[#f4edee] min-h-screen font-quicksand">
            <div
                className="
                    w-full 
                    h-[250px] 
                    sm:h-[300px] 
                    md:h-[400px] 
                    lg:h-[480px] 
                    xl:h-[550px] 
                    bg-cover 
                    bg-[center_10%] 
                    bg-no-repeat 
                    rounded-b-[8px]"
                style={{ backgroundImage: "url('/signUp.png')" }}
            />

            <div className="flex flex-col items-center mt-14 px-8">
                <div className="text-[#030303] text-4xl font-bold leading-10 text-center mb-6 font-poppins">
                    Sign Up
                </div>

                <form className="flex flex-col gap-6 w-full max-w-md" onSubmit={submit}>
                    <div className="grid gap-6">
                        <Input type="hidden" value={data.role} name="role" />

                        <div className="grid gap-2">
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
                                className="mt-2 w-full h-[46px] px-2 border-0 rounded-md shadow-sm bg-white text-[#94a3b8] text-sm font-medium"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                                className="mt-2 w-full h-[46px] px-2 border-0 rounded-md shadow-sm bg-white text-[#94a3b8] text-sm font-medium"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2 mt-2 relative">
                            <div className="relative flex items-center">
                                <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                                className="w-full h-[46px] px-2 pr-10 border-0 rounded-md shadow-sm bg-white text-[#94a3b8] text-sm font-medium"
                                />
                                <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-[#4a4c7f]"
                                tabIndex={-1}
                                >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <InputError message={errors.password} />
                        </div>

                            <div className="grid gap-2 mt-2 relative">
                                <div className="relative flex items-center">
                                    <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirm password"
                                    className="w-full h-[46px] px-2 pr-10 border-0 rounded-md shadow-sm bg-white text-[#94a3b8] text-sm font-medium"
                                    />
                                    <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 text-[#4a4c7f]"
                                    tabIndex={-1}
                                    >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <InputError message={errors.password_confirmation} />
                            </div>

                        <Button
                            type="submit"
                            className="mt-6 w-full h-[44px] px-2 border-0 rounded-md shadow-md bg-[#809eff] text-black text-sm font-poppins font-bold"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Create account
                        </Button>
                    </div>
                    <div className="text-sm mt-5 mb-5 flex justify-center items-center">
                        <span className="text-[#090a0e]">Already have an account?</span>
                        <TextLink
                            href={route('login')}
                            className="text-[#4a4c7f] font-medium ml-4 sm:ml-8 md:ml-12 lg:ml-20"
                        >
                            Log in
                        </TextLink>
                    </div>
                </form>
            </div>
        </div>
    );
}
