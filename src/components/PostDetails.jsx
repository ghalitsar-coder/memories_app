import {
  Button,
  CardActions,
  CircularProgress,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { FETCH_POSTS_BY_SEARCH, GET_POST } from "../api/apiCalls";
import { clearPost } from "../redux/postsRedux";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { post, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (id) GET_POST(id, dispatch);
  }, [id]);

  useEffect(() => {
    if (post)
      FETCH_POSTS_BY_SEARCH(
        { search: "none", tags: post?.tags.join(",") },
        dispatch
      );
  }, [post]);

  const recomendedPosts = posts.filter((post) => post._id !== id);
  useEffect(() => {
    console.log(post);
    dispatch(clearPost());
    console.log(post);
  }, [location]);

  //   if (isPending) {
  //     return (
  //       <div className="container mx-auto text-center p-5 rounded-lg font-[Poppins] shadow-lg ">
  //         <Skeleton variant="text" />
  //         <Skeleton variant="circular" width={40} height={40} />
  //         <Skeleton variant="rectangular" width={210} height={118} />

  //         <Skeleton />
  //         <Skeleton animation="wave" />
  //         <Skeleton animation={false} />
  //       </div>
  //     );
  //   }

  if (!post) {
    return (
      <div className="container mx-auto text-center p-5 rounded-lg font-[Poppins] shadow-lg ">
        <h1 className="text-6xl font-bold ">404 Not Found</h1>
        <p
          className="text-lg text-slate-600 my-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Back to homepage
        </p>
      </div>
    );
  }

  return (
    <div className=" container flex  shadow-lg flex-col gap-x-4 md:flex-row md:items-center  rounded-md mx-auto my-20 p-4 bg-white ">
      <div className="flex-1 flex flex-wrap order-2 md:order-1   ">
        <div className="grid gap-y-2 md:gap-y-4 w-full ">
          <h1 className="text-2xl lg:text-4xl font-semibold">{post.creator}</h1>
          <span className="text-sm lg:text-md text-slate-400">
            {post.tags.map((t) => `#${t}`)}
          </span>
          <h2 className="text-4xl lg:text-6xl font-semibold font-[Poppins] ">
            {post.title}
          </h2>
          <p className="text-sm lg:text-md text-slate-500">{post.message}</p>
        </div>
        {/* <CommentsSection postId={post._id} /> */}
      </div>
      <div className="flex-1 order-1 mb-5 md:mb-0 md:order-2 bg-cover bg-center md:h-[400px] lg:h-full w-full ">
        <img
          src={post.selectedFile}
          alt="details post"
          className="w-full h-full  rounded-lg shadow-lg border  lg:rounded-l-full bg-cover bg-center"
        />
      </div>
    </div>
  );
};

export default PostDetails;
