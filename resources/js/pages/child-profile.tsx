import { Head, usePage } from '@inertiajs/react';

interface Child {
  id: number;
  name: string;
}

export default function ChildProfile() {
  const { child } = usePage<{ child: Child }>().props;

  return (
    <div className="screen bg-[#F4EDEC] flex flex-col items-center justify-center min-h-screen p-6">
      <Head title="Child Profile" />

      <div
        className="w-[375px] h-[314px] rounded-lg bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/child-profile.png')" }}
      >
        <div className="absolute top-4 left-4 bg-white p-2 rounded-full">
          <img src="/profile-icon.png" alt="Profile icon" className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Welcome!
        </h1>
      </div>

      <div className="mt-4 text-center text-gray-700">
        <p>Your child's profile has been successfully created!</p>
        

       
      </div>
    </div>
  );
}
