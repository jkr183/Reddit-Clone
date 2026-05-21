"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register = async () => {

    try {

      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      alert("Registration successful!");

    } catch (error) {

      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex justify-center mt-20">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-[450px]">

          <h1 className="text-4xl font-bold mb-8 text-black">
            Register
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
              type="text"
              placeholder="Username"
              className="border p-4 rounded-lg"
              onChange={(e) =>
                setUsername(e.target.value)
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
              onClick={register}
              className="bg-orange-500 text-white p-4 rounded-lg font-bold"
            >
              Register
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}