"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LoginMethod } from "@/actions/login/route";
import { verifyOTPMethod } from "@/actions/verify-otp/route";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [statusOTPSent, setStatusOTPSent] = useState(false);
  const [messageOTPSent, setMessageOTPSent] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [idUser, setIdUser] = useState("");

  const router = useRouter();

  const SubmitMethod = async (datas: React.FormEvent) => {
    datas.preventDefault();

    const result = await LoginMethod(data);

    if (result.status == 200) {
      setIdUser(result.data.id_user);
      alert("Check your email for the OTP code");

      // ✔ SIMPAN DATA USER
      localStorage.setItem("Username_client", result.data.username);
      localStorage.setItem("Email_client", result.data.email);

      // 🔥 FIX UTAMA — WAJIB ADA
      localStorage.setItem("id_user", result.data.id_user);

      // masih oke kalau mau tetap simpan userId untuk change-password
      localStorage.setItem("userId", result.data.id_user);

      setStatusOTPSent(true);
      setMessageOTPSent("Verify OTP Code");
    } else {
      alert(result.message);
    }
  };

  const VerifyOtpCodeMethod = async (data: React.FormEvent) => {
    data.preventDefault();

    const datas = {
      idUser: idUser,
      otpCode: otpCode,
    };

    const result = await verifyOTPMethod(datas);

    if (result.status == 200) {
      alert(result.message);
      setOtpCode("");
      router.push("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {statusOTPSent ? messageOTPSent : "Login Your Account"}
        </h2>

        {!statusOTPSent ? (
          <form className="space-y-4" onSubmit={SubmitMethod}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={data.email}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="you@example.com"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={data.password}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="********"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Login Account
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              have not an account yet?{" "}
              <Link href={"/client/register"} className="text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={VerifyOtpCodeMethod}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <input
                type="text"
                value={otpCode}
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="123456"
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormLogin;
