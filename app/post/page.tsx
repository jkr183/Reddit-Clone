"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function PostPage() {

  const [mounted, setMounted] =
    useState(false);

  const [authorized, setAuthorized] =
  useState(false);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [communityId, setCommunityId] =
    useState("");

  const [authorId, setAuthorId] =
    useState("");

  const [communities, setCommunities] =
    useState<any[]>([]);

  // WAIT FOR CLIENT
  useEffect(() => {

    setMounted(true);

  }, []);

  // LOAD USER + COMMUNITIES
  useEffect(() => {

    if (!mounted) return;

    fetchCommunities();

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      const user =
        JSON.parse(storedUser);

      setAuthorId(user.id);

      setAuthorized(true);

    } else {

      window.location.href =
        "/login";
    }

  }, [mounted]);

  // FETCH COMMUNITIES
  const fetchCommunities = async () => {

    try {

      const response =
        await axios.get(
          "/api/community"
        );

      setCommunities(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // CREATE POST
  const createPost = async () => {

    try {

      await axios.post(
        "/api/post",
        {
          title,
          content,
          communityId,
          authorId,
        }
      );

      alert("Post created!");

      setTitle("");
      setContent("");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Failed to create post");
    }
  };

  // PREVENT HYDRATION ISSUES
  if (!mounted || !authorized) {

    return (
      <div className="p-10 text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-6">

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <h1 className="text-4xl font-bold mb-8 text-black">
            Create Post
          </h1>

          <div className="flex flex-col gap-5">

            {/* TITLE */}
            <input
              type="text"
              placeholder="Post Title"
              className="border p-4 rounded-lg"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            {/* CONTENT */}
            <textarea
              placeholder="Post Content"
              className="border p-4 rounded-lg h-40"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
            />

            {/* COMMUNITY */}
            <select
              className="border p-4 rounded-lg"
              value={communityId}
              onChange={(e) =>
                setCommunityId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Community
              </option>

              {communities.map(
                (community) => (

                  <option
                    key={community.id}
                    value={community.id}
                  >
                    {community.name}
                  </option>
                )
              )}

            </select>

            {/* BUTTON */}
            <button
              onClick={createPost}
              className="bg-orange-500 text-white p-4 rounded-lg font-bold"
            >
              Create Post
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}