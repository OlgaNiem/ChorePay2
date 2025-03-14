import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button'; 
import { usePage, router } from '@inertiajs/react';

const AddChild = () => {
  const { errors } = usePage().props;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

      router.post(route('store-child-profile'), { 
      name: fullName, 
      email,  
      password, 
      password_confirmation: confirmPassword  
    }, {
      onSuccess: () => {
        console.log('Child profile created successfully!');
      },
      onError: (errors) => {
        console.error("Error creating child profile:", errors);
      },
      onFinish: () => setIsLoading(false)
    });
  };

  return (
    <div className="screen bg-[#F4EDEC] flex flex-col items-center justify-center min-h-screen p-6">
      <Head title="Create Profile for Your Child" />

      <div className="w-[375px] h-[314px] rounded-lg bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/add-child.png')" }}
      >
        <div className="absolute top-4 left-4 bg-white p-2 rounded-full">
          <img src="/plus-icon.png" alt="Add icon" className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Create Profile for Your Child
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm space-y-4">

        {errors.name && (
          <div className="text-red-500 text-sm text-center">{errors.name}</div>
        )}

        {errors.email && (
          <div className="text-red-500 text-sm text-center">{errors.email}</div>
        )}

        {errors.password && (
          <div className="text-red-500 text-sm text-center">{errors.password}</div>
        )}

        {errors.password_confirmation && (
          <div className="text-red-500 text-sm text-center">{errors.password_confirmation}</div>
        )}

        <div>
          <label htmlFor="fullName" className="block text-lg text-gray-700 font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            name="name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#6B7280] text-[#6B7280]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg text-gray-700 font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#6B7280] text-[#6B7280]"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-lg text-gray-700 font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#6B7280] text-[#6B7280]"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-lg text-gray-700 font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="password_confirmation"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-[#6B7280] text-[#6B7280]"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-3 text-lg bg-yellow-500 text-black font-semibold rounded-lg"
        >
          {isLoading ? "Creating..." : "Create Profile"}
        </Button>
      </form>
    </div>
  );
};

export default AddChild;
