import React, { useState } from 'react'
import Link from 'next/link'
import { RegisterMethod } from '@/actions/register/route'

const FormRegister = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [message, setMessage] = useState("")

    const SubmitMethod = async (datas: React.FormEvent) => {
        datas.preventDefault()

        const result = await RegisterMethod(data)

        setMessage(result.message)
        setData({username: "", email: "", password: ""})
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={SubmitMethod}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={data.username}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
              placeholder="Bejorka"
              onChange={(e) => setData({... data, username: e.target.value})}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={data.email}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
              placeholder="you@example.com"
              onChange={(e) => setData({... data, email: e.target.value})}
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
              onChange={(e) => setData({... data, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Create Account
          </button>

          {message && (
            <p className="mt-3 text-center text-sm font-medium text-gray-700">
              {message}
            </p>
          )}

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button className="cursor-pointer text-indigo-600 hover:underline">
              <Link href={"/client/login"}>Sign In</Link>
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default FormRegister