"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function CommunityFeedPage() {

  const searchParams =
    useSearchParams();

  const slug =
    searchParams.get("slug");

  const [loading, setLoading] =
    useState(true);

  const [community, setCommunity] =
    useState<any>(null);

  const [posts, setPosts] =
    useState<any[]>([]);

  // FETCH COMMUNITY
  useEffect(() => {

    if (slug) {

      fetchCommunity();
    }

  }, [slug]);

  const fetchCommunity = async () => {

    try {

      const response =
        await axios.get(
          `/api/community/${slug}`
        );

      setCommunity(
        response.data.community
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

  // NO COMMUNITY
  if (!community) {

    return (
      <div className="p-10 text-red-500">
        Community not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 px-6">

        {/* HEADER */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

          <h1 className="text-5xl font-bold text-black mb-4">
            r/{community.slug}
          </h1>

          <p className="text-gray-600 text-lg">
            {community.name}
          </p>

        </div>

        {/* POSTS */}
        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow"
            >

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

              <p className="text-gray-700 mb-5">
                {post.content}
              </p>

              <p className="text-sm text-gray-500">
                Community post
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}