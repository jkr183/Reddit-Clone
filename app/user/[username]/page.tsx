"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {

  const { username } =
    use(params);

  const [user, setUser] =
    useState<any>(null);

  const [posts, setPosts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH USER
  useEffect(() => {

    if (username) {

      fetchUser();
    }

  }, [username]);

  const fetchUser = async () => {

    try {

      const response =
        await axios.get(
          `/api/user/${username}`
        );

      setUser(
        response.data.user
      );

      setPosts(
        response.data.posts
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // LOADING
  if (loading) {

    return (
      <div className="p-10 text-black">
        Loading...
      </div>
    );
  }

  // USER NOT FOUND
  if (!user) {

    return (
      <div className="p-10 text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 px-6">

        {/* PROFILE CARD */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

          <h1 className="text-5xl font-bold text-black mb-4">
            u/{user.username}
          </h1>

          <p className="text-gray-600 text-lg">
            Joined{" "}
            {new Date(
              user.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

        {/* POSTS */}
        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              {/* COMMUNITY */}
              <a
                href={`/community-feed?slug=${post.community.slug}`}
              >
                <p className="text-orange-500 font-semibold mb-3 hover:underline">
                  r/{post.community.slug}
                </p>
              </a>

              {/* TITLE */}
              <a
                href={`/post/${post.id}?title=${encodeURIComponent(
                  post.title
                )}&content=${encodeURIComponent(
                  post.content
                )}`}
              >

                <h2 className="text-3xl font-bold text-black mb-4 hover:text-orange-500">
                  {post.title}
                </h2>

              </a>

              {/* CONTENT */}
              <p className="text-gray-700 mb-5">
                {post.content}
              </p>

              {/* FOOTER */}
              <div className="text-sm text-gray-500">

                <p>
                  {new Date(
                    post.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}