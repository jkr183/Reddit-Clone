"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function CommunityPage() {

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  // PROTECT PAGE
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      window.location.href =
        "/login";
    }

  }, []);

  // CREATE COMMUNITY
  const createCommunity = async () => {

    try {

      await axios.post(
        "/api/community",
        {
          name,
          slug,
        }
      );

      alert(
        "Community created!"
      );

      setName("");
      setSlug("");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create community"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-6">

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h1 className="text-4xl font-bold mb-8 text-black">
            Create Community
          </h1>

          <div className="flex flex-col gap-5">

            {/* NAME */}
            <input
              type="text"
              placeholder="Community Name"
              className="border p-4 rounded-lg"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            {/* SLUG */}
            <input
              type="text"
              placeholder="community-slug"
              className="border p-4 rounded-lg"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
            />

            {/* BUTTON */}
            <button
              onClick={createCommunity}
              className="bg-orange-500 text-white p-4 rounded-lg font-bold"
            >
              Create Community
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}