import { Head, usePage, router } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

export default function AddChild() {
  const { errors } = usePage().props;
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    router.post(
      route('store-child-profile'),
      {
        name: fullName,
        password,
        password_confirmation: confirmPassword,
      },
      {
        onFinish: () => setIsLoading(false),
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F4EDEC] flex flex-col justify-start pt-0 font-quicksand">
      <Head title="Create profile for your child" />
        <div className="
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
        style={{ backgroundImage: "url('/child-profile.png')" }}
      />

      <div className="flex flex-col items-center mt-14 px-8">
        <div className="text-[#030303] text-3xl font-bold leading-10 text-center mb-6 font-poppins">
          Create profile for your child
        </div>

        <form className="flex flex-col gap-6 w-full max-w-md" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Child's name"
                className="mt-2 w-full h-[46px] px-2 border-0 rounded-md shadow-sm bg-[#fdfdfd] text-[#94a3b8] text-sm font-medium"
              />
              <InputError message={errors.name} />
            </div>

            <div className="grid gap-2 relative">
              <div className="relative flex items-center">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-[46px] px-2 pr-10 border-0 rounded-md shadow-sm bg-[#fdfdfd] text-[#94a3b8] text-sm font-medium"
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

            <div className="grid gap-2 relative">
              <div className="relative flex items-center">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full h-[46px] px-2 pr-10 border-0 rounded-md shadow-sm bg-[#fdfdfd] text-[#94a3b8] text-sm font-medium"
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
              className="mt-5 mb-5 w-full h-[44px] px-2 border-0 rounded-md shadow-md bg-[#809eff] text-black text-sm font-poppins font-bold"
              disabled={isLoading}
            >
              {isLoading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Create Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
