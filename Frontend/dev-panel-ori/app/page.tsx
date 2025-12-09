'use client';
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src={"/globe.svg"} // letakkan logo di folder public/logo.png
          alt="Gim Store Logo"
          width={100}
          height={100}
        />
      </div>

      {/* Welcome Text */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center">
        Welcome Developers in <span className="text-blue-500">Gim Store</span>
      </h1>

      {/* Sub Text */}
      <p className="text-gray-400 text-lg mb-10 text-center max-w-lg">
        You can publish whatever your game into this platform with the lower cost, TRUST ME! IM NOT GONNA LIE DUHH!
      </p>

      {/* Sign Up Button */}
      <Link href="/dev/register">
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold text-lg transition">
          Sign Up
        </button>
      </Link>
    </div>
  );
}
