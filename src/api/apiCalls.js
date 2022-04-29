import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  getPostsBySearch,
  likePost,
  PostFailure,
  PostStart,
  updatePost,
  getCommentsById,
} from "../redux/postsRedux";
import { authError, authStart, authSuccess } from "../redux/usersRedux";
import * as api from "./index";

export const FETCH_POSTS = async (page, dispatch) => {
  dispatch(PostStart());
  try {
    const { data } = await api.fetchPosts(page);
    dispatch(getPosts(data));
  } catch (err) {
    dispatch(PostFailure());
  }
};
export const FETCH_POSTS_BY_SEARCH = async (searchQ, dispatch) => {
  dispatch(PostStart());
  try {
    const { data } = await api.searchPosts(searchQ);
    dispatch(getPostsBySearch(data));
  } catch (err) {
    dispatch(PostFailure());
  }
};
export const CREATE_POST = async (postData, dispatch) => {
  dispatch(PostStart());
  try {
    const { data } = await api.createPost(postData);
    dispatch(addPost(data));
  } catch (err) {
    dispatch(PostFailure());
  }
};

export const DELETE_POST = async (id, dispatch) => {
  dispatch(PostStart());

  try {
    await api.deletePost(id);
    dispatch(deletePost(id));
  } catch (err) {
    console.log(err);
  }
  dispatch(PostFailure());
};
export const GET_POST = async (id, dispatch) => {
  // dispatch(PostStart());

  try {
    const { data } = await api.fetchPost(id);
    dispatch(getPost(data));
  } catch (err) {
    console.log(err);
  }
  // dispatch(PostFailure());
};

export const UPDATE_POST = async (postData, dispatch) => {
  dispatch(PostStart());
  try {
    // console.log(postData,postData._id)
    const { data } = await api.updatePost(postData._id, postData);
    dispatch(updatePost(data));
  } catch (err) {
    dispatch(PostFailure());
  }
};

export const LIKE_POST = async (id, dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch(likePost(data));
  } catch (err) {
    console.log(err);
  }
};

 

export const USER_LOGIN = async (user, dispatch) => {
  dispatch(authStart());
  try {
    const { data } = await api.userLogin(user);
    dispatch(authSuccess(data));
  } catch (err) {
    console.log(err);

    dispatch(authError(err.response.data.message));
  }
};

export const USER_REGISTER = async (user, dispatch) => {
  dispatch(authStart());
  try {
    const { data } = await api.userRegister(user);
    dispatch(authSuccess(data));
  } catch (err) {
    dispatch(authError(err.response.data.message));
  }
};
