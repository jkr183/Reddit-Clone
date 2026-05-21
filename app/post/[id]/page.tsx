"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function SinglePostPage() {

  const searchParams =
    useSearchParams();

  const title =
    searchParams.get("title");

  const content =
    searchParams.get("content");

  const [postId, setPostId] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [comments, setComments] =
    useState<any[]>([]);

  const [authorId, setAuthorId] =
    useState("");

  // LOAD USER + POST ID
useEffect(() => {

  // USER
  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {

    const user =
      JSON.parse(storedUser);

    setAuthorId(user.id);
  }

  // POST ID
  const id =
    window.location.pathname
      .split("/")
      .pop();

  if (id) {

    setPostId(id);
  }

}, []);

  // FETCH COMMENTS
  useEffect(() => {

    if (postId) {

      fetchComments();
    }

  }, [postId]);

  const fetchComments = async () => {

    try {

      const response =
        await axios.get(
          `/api/comment?postId=${postId}`
        );

      setComments(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // ADD COMMENT
  const addComment = async () => {

    if (!authorId) {

      alert(
        "Please login first"
      );

      window.location.href =
        "/login";

      return;
    }

    try {

      await axios.post(
        "/api/comment",
        {
          content: comment,
          postId,
          authorId,
        }
      );

      setComment("");

      fetchComments();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to add comment"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-6">

        {/* POST */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

          <h1 className="text-4xl font-bold text-black mb-5">
            {title}
          </h1>

          <p className="text-gray-700 text-lg">
            {content}
          </p>

        </div>

        {/* COMMENT FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

          <h2 className="text-3xl font-bold mb-6 text-black">
            Comments
          </h2>

          <div className="flex flex-col gap-5">

            <textarea
              placeholder="Write a comment..."
              className="border p-4 rounded-lg h-32"
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />

            <button
              onClick={addComment}
              className="bg-orange-500 text-white p-4 rounded-lg font-bold"
            >
              Add Comment
            </button>

          </div>

        </div>

        {/* COMMENTS LIST */}
        <div className="space-y-5">

          {comments.map((comment) => (

            <div
              key={comment.id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <p className="text-gray-700 text-lg mb-3">
                {comment.content}
              </p>

              <p className="text-sm text-gray-500">
                {comment.author.username}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}