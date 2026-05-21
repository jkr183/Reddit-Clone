"use client";

import {
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import axios from "axios";
import Navbar from "@/components/Navbar";

function CommunityFeedContent() {

  const searchParams =
    useSearchParams();

  const slug =
    searchParams.get("slug");

  const [community, setCommunity] =
    useState<any>(null);

  useEffect(() => {

    if (slug) {

      fetchCommunity();
    }

  }, [slug]);

  const fetchCommunity =
    async () => {

    try {

      const response =
        await axios.get(
          `/api/community/${slug}`
        );

      setCommunity(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  if (!community) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-6">

        {/* COMMUNITY INFO */}
        <div className="bg-white p-8 rounded-2xl shadow mb-10">

          <h1 className="text-6xl font-bold text-black mb-4">
            r/{community.community.slug}
          </h1>

          <p className="text-gray-600 text-2xl">
            {community.community.name}
          </p>

        </div>

        {/* POSTS */}
        <div className="space-y-6">

          {community.posts.map(
            (post: any) => (

            <div
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <a
                href={`/post/${post.id}`}
              >

                <h2 className="text-4xl font-bold text-black mb-4 hover:text-orange-500">
                  {post.title}
                </h2>

              </a>

              <p className="text-gray-700 text-lg mb-5">
                {post.content}
              </p>

              <p className="text-gray-500">
                Community post
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default function CommunityFeedPage() {

  return (

    <Suspense
      fallback={
        <div className="p-10">
          Loading...
        </div>
      }
    >

      <CommunityFeedContent />

    </Suspense>
  );
}