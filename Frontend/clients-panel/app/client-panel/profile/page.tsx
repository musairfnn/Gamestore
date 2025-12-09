"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const name = localStorage.getItem("Username_client");
    const mail = localStorage.getItem("Email_client");
    if (name) setUsername(name);
    if (mail) setEmail(mail);
  }, []);

  if (!isClient) return null;

  return (
    <main className="max-w-lg mx-auto mt-14 p-8 bg-white shadow-lg rounded-2xl border border-gray-100">
      <div className="flex items-center gap-4 mb-7">
        <User size={42} className="text-indigo-600" />
        <div>
          <h1 className="text-xl font-semibold">Hello, {username} 👋</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Manage your profile details and keep your account secure.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-gray-500 text-sm">Username</p>
          <p className="text-lg font-medium mt-0.5">{username}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-lg font-medium mt-0.5">{email}</p>
        </div>
      </div>

      <div className="mt-8">
        <a
          href="/client-panel/profile/edit-password"
          className="inline-block px-4 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-all shadow-sm"
        >
          Change Password
        </a>
      </div>
    </main>
  );
}
