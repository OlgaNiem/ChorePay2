import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LoginForm, PageProps } from '@/types';

export default function Login() {
    const { status } = usePage<PageProps>().props as PageProps & { status?: string };
  const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
    email: '',
    name: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login-child'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <>
      <Head title="Log in for children" />

      <div className="min-h-screen bg-[#F4EDEC] flex flex-col justify-start pt-0">
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
          style={{ backgroundImage: "url('/child-login.png')" }}
        />

        <div className="mt-14 w-full max-w-sm px-8 mx-auto">
          <h1 className="text-3xl font-bold text-center text-neutral-900 font-poppins leading-tight">
            Log In
          </h1>

          <form className="mt-8 space-y-6" onSubmit={submit}>
            <div className="space-y-4">
              <div>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={data.name as string}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Enter your name"
                  className="h-11 px-2 rounded-md shadow-sm bg-[#fdfdfd] placeholder:text-slate-400 font-medium text-sm"
                />
                <InputError message={errors.name} />
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={data.password as string}
                  onChange={(e) => setData('password', e.target.value)}
                  placeholder="Password"
                  className="h-12 px-2 pr-10 rounded-md shadow-sm bg-[#fdfdfd] placeholder:text-slate-400 font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4c7f]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <InputError message={errors.password} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={Boolean(data.remember)}
                  onClick={() => setData('remember', !data.remember)}
                  className="bg-white border border-gray-300 data-[state=checked]:bg-[#4a4c7f] data-[state=checked]:border-[#4a4c7f]"
                />
                <Label htmlFor="remember" className="text-sm font-quicksand">
                  Remember me
                </Label>
              </div>

              <Button
                type="submit"
                className="mb-6 w-full h-11 rounded-md bg-[#f9cc18] text-black font-bold shadow-md hover:bg-yellow-400"
                disabled={processing}
              >
                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                Log in
              </Button>
            </div>
          </form>

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
