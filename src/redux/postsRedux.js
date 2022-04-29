import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    post: null,
    posts: [],
    currentPage: 1,
    numberOfPages: 1,
    isPending: false,
    error: false,
  },
  reducers: {
    PostStart: (state) => {
      state.isPending = true;
      state.error = false;
    },
    getPosts: (state, action) => {
      state.posts = action.payload.data;
      state.isPending = false;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
    },
    getPostsBySearch: (state, action) => {
      state.posts = action.payload;
      state.isPending = false;
    },
    getPost: (state, action) => {
      state.post = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
      state.isPending = false;
    },
    deletePost: (state, action) => {
      state.posts.splice(state.posts.indexOf(action.payload), 1);
      state.isPending = false;
    },
    updatePost: (state, action) => {
      // state.posts = state.posts.map((post) =>
      //   post._id === action.payload._id ? action.payload : post
      // );
      state.posts[
        state.posts.findIndex((post) => post._id === action.payload._id)
      ] = action.payload;
      state.isPending = false;
    },
    likePost: (state, action) => {
      // state.posts = state.posts.map((post) =>
      //   post._id === action.payload._id ? action.payload : post
      // );
      state.posts[
        state.posts.findIndex((post) => post._id === action.payload._id)
      ] = action.payload;
      state.isPending = false;
    },

    PostFailure: (state) => {
      state.error = true;
      state.isPending = false;
    },
    clearPost: (state) => {
      state.post = null;
      state.isPending = false;
    },
  },
});

export const {
  PostFailure,
  PostStart,
  getPosts,
  addPost,
  deletePost,
  updatePost,
  getPost,
  clearPost,
  likePost,
  getPostsBySearch,
  getCommentsById,
} = postSlice.actions;
export default postSlice.reducer;
