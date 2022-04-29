import { CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Post } from "./Post";

const Posts = () => {
  const { posts, isPending } = useSelector((state) => state.posts);

  return !isPending ? (
    <div className="flex-[2]  p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 xl:grid-cols-3">
        {posts?.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default Posts;
