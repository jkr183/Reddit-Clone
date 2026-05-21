"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function Home() {

  // POSTS STATE
  const [posts, setPosts] =
    useState<any[]>([]);

  // SORT STATE
  const [sort, setSort] =
    useState("latest");

  // FETCH POSTS
  useEffect(() => {

    fetchPosts();

  }, [sort]);

  const fetchPosts = async () => {

    try {

      const response =
        await axios.get(
          `/api/post?sort=${sort}`
        );

      setPosts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // VOTE FUNCTION
  const vote = async (
    postId: string,
    type: string
  ) => {

    try {

      await axios.post(
        "/api/vote",
        {
          postId,
          type,
        }
      );

      // REFRESH POSTS
      fetchPosts();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-6">

        {/* SORT BAR */}
        <div className="flex justify-end mb-6">

          <select
            className="border p-3 rounded-lg"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="latest">
              Latest
            </option>

            <option value="popular">
              Popular
            </option>

          </select>

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

                <h1 className="text-3xl font-bold text-black mb-4 hover:text-orange-500 cursor-pointer">
                  {post.title}
                </h1>

              </a>

              {/* VOTES */}
              <div className="flex items-center gap-4 mb-4">

                {/* UPVOTE */}
                <button
                  onClick={() =>
                    vote(post.id, "upvote")
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  ⬆ Upvote
                </button>

                {/* COUNT */}
                <p className="font-bold text-lg">
                  {post.votes}
                </p>

                {/* DOWNVOTE */}
                <button
                  onClick={() =>
                    vote(post.id, "downvote")
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  ⬇ Downvote
                </button>

              </div>

              {/* CONTENT */}
              <p className="text-gray-700 mb-5">
                {post.content}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between text-sm text-gray-500">

                <a
                  href={`/user/${post.author.username}`}
                >
                  <p className="hover:underline cursor-pointer">
                    Posted by {post.author.username}
                  </p>
                </a>

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