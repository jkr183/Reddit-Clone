"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {

    try {

      const response = await axios.post(
        "/api/login",
        {
          email,
          password,
        }
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
   );

   alert("Login successful!");

   window.location.href = "/";

    } catch (error) {

      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center mt-20">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">

          <h1 className="text-4xl font-bold mb-8 text-black">
            Login
          </h1>

          <div className="flex flex-col gap-5">

            <input
              type="email"
              placeholder="Email"
              className="border p-4 rounded-lg"
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-4 rounded-lg"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              onClick={login}
              className="bg-blue-500 text-white p-4 rounded-lg font-bold"
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}