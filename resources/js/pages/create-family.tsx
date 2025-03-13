import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button'; 
import { Head } from '@inertiajs/react';

const CreateFamily = () => {
  const { errors } = usePage().props;
  const [familyName, setFamilyName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!familyName) {

      return;
    }

    try {

      await router.post(route('store-family'), { name: familyName });

      router.visit(route('join-family'));
    } catch (err) {
      console.error('Error creating family:', err);
    }
  };

  return (
    <div className="screen bg-[#F4EDEC] flex flex-col items-center justify-center min-h-screen p-6">
      <Head title="Create Family" />

      <div
        className="w-[375px] h-[314px] rounded-lg bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/create-family.png')" }}
      />

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Create Your Family
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm space-y-4">
        {errors.name && (
          <div className="text-red-500 text-sm text-center">{errors.name}</div>
        )}

        <div>
          <label htmlFor="familyName" className="block text-lg text-gray-700 font-medium">
            Family Name
          </label>
          <input
            id="familyName"
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            placeholder="Write your family name here..."
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#6B7280] text-[#6B7280]"
          />
        </div>
        
        <Button type="submit" className="w-full py-3 text-lg bg-yellow-500 text-black font-semibold rounded-lg">
          Create Family
        </Button>
      </form>
    </div>
  );
};

export default CreateFamily;
