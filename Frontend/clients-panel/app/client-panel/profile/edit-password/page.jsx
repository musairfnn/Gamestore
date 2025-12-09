"use client";

import { useState } from "react";

export default function EditPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(
        `http://localhost:4000/user/change-password/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setOldPassword("");
        setNewPassword("");
      } else {
        setMessage({
          type: "error",
          text: data.message || "fail to change password",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error!" });
    }

    setLoading(false);
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Change Password
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 border">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="your old password"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
              placeholder="Insert a new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Change Password"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </main>
  );
}
