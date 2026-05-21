"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="bg-orange-500 text-white px-8 py-4 flex justify-between items-center">

      {/* LOGO */}
      <Link href="/">
        <h1 className="text-3xl font-bold">
          Reddit Clone
        </h1>
      </Link>

      {/* LINKS */}
      <div className="flex gap-5 items-center">

        <Link href="/community">
          <p className="font-semibold">
            Communities
          </p>
        </Link>

        <Link href="/post">
          <p className="font-semibold">
            Create Post
          </p>
        </Link>

        {/* IF LOGGED IN */}
        {user ? (

          <div className="flex items-center gap-4">

            <p className="font-bold">
              {user.username}
            </p>

            <button
              onClick={logout}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        ) : (

          <>
            <Link href="/login">
              <button className="bg-white text-black px-4 py-2 rounded-lg">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="bg-black text-white px-4 py-2 rounded-lg">
                Register
              </button>
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}