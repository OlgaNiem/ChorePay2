import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button'; 
const JoinFamily = () => {
  const { errors } = usePage().props; 
  const [familyCode, setFamilyCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!familyCode) {

      return;
    }

    try {
      await router.post(route('join-family.store'), { family_code: familyCode });
      router.visit(route('family-options')); // Redirect after successful join
    } catch (err) {
      console.error('Error joining family:', err);
    }
  };

  return (
    <div className="screen bg-[#F4EDEC] flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        Join a Family
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm space-y-4">

        {errors.family_code && (
          <div className="text-red-500 text-sm text-center">{errors.family_code}</div>
        )}


        <div>
          <label htmlFor="familyCode" className="block text-lg text-gray-700 font-medium">
            Family Code
          </label>
          <input
            id="familyCode"
            type="text"
            value={familyCode}
            onChange={(e) => setFamilyCode(e.target.value)}
            placeholder="Enter the family code"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#6B7280] text-[#6B7280]"
          />
        </div>


        <Button type="submit" className="w-full py-3 text-lg bg-yellow-500 text-black font-semibold rounded-lg">
          Join Family
        </Button>
      </form>
    </div>
  );
};

export default JoinFamily;
