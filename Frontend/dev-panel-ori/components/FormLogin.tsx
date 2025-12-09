import { LoginMethod } from "@/actions/login/route";
import { VerifyOtp } from "@/actions/verify_otp/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FormLogin = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [otpCode, setOtpCode] = useState("")
  const [idDev, setIdDev] = useState("")

  const [statusOTPSent, setStatusOTPSent] = useState(false)
  const [messageOTPSent, setMessageOTPSent] = useState("")

  const router = useRouter()

  const SubmitMethod = async (datas: React.FormEvent) => {
    datas.preventDefault()

    const result = await LoginMethod(data)

    if(result.status == 200){
      const id_dev = result.data.id_devs
      setIdDev(id_dev)
      alert("Check your email for OTP Code")

      localStorage.setItem("username", result.data.username)
      localStorage.setItem("id_dev", idDev)

      setStatusOTPSent(true)
      setMessageOTPSent("Verify Code")
    }
    
    setData({ email: "", password: "" });
  }

  const VerifyOtpCodeMethod = async (data: React.FormEvent) => {
    data.preventDefault()

    const result = await VerifyOtp(idDev, otpCode)

    alert(result.message)

    if(result.status == 200){
      router.push(`/dev-panel/dashboard`)
    }
  }

  useEffect(() => {
    if(idDev){
      localStorage.setItem("id_dev", idDev)
    }
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {statusOTPSent ? messageOTPSent : "Login Your Account"}
        </h2>
        {!statusOTPSent ? 
        (
          <form className="space-y-4" onSubmit={SubmitMethod}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={data.email}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
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
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
              placeholder="********"
              onChange={(e) => setData({ ... data, password: e.target.value })}
              required
            />
          </div>

          <button
            type={"submit"}
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Login Account
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            have not an account yet?{" "}
            <span className="cursor-pointer text-indigo-600 hover:underline">
              <Link href={"/dev/register"}>Sign Up</Link>
            </span>
          </p>
        </form>
        ) 
        : 
        (
          <form className="space-y-4" onSubmit={VerifyOtpCodeMethod}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <input
                type="text"
                value={otpCode}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
                placeholder="123456"
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />
            </div>

            <button
              type={"submit"}
              className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Verify
            </button>
          </form>
        )
        }
      </div>
    </div>
  );
};

export default FormLogin;

