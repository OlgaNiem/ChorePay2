import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


export default function CreateFamily() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('store-family'));
  };

  return (
    <div className="bg-[#f4edee] min-h-screen font-quicksand">
      <Head title="Create Family" />

      <div
        className="
          w-full 
          h-[250px] 
          sm:h-[300px] 
          md:h-[400px] 
          lg:h-[480px] 
          xl:h-[550px] 
          bg-cover 
          bg-[center_40%] 
          bg-no-repeat 
          rounded-b-[8px]"
        style={{ backgroundImage: "url('/create-family.png')" }}
      />

      <div className="flex flex-col items-center mt-14 px-8">
      <h1 className="text-[#030303] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center mb-6 font-poppins">
        Create your family
      </h1>

        <form className="flex flex-col gap-6 w-full max-w-md" onSubmit={submit}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Input
                id="name"
                type="text"
                required
                autoFocus
                autoComplete="off"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                placeholder="Write your family name here..."
                className="mt-2 w-full h-[46px] px-2 border-0 rounded-md shadow-sm bg-[#fdfdfd] text-[#6b7280] text-sm font-medium"
              />
              <InputError message={errors.name} className="mt-2" />
            </div>

            <Button
              type="submit"
              className="mt-5 mb-5 w-full h-[44px] px-2 border-0 rounded-md shadow-md bg-[#ffd500] text-black text-sm font-poppins font-bold  hover:bg-yellow-400"
              disabled={processing}
            >
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Create family
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
