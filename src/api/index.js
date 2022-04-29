import axios from "axios";

// const TOKEN = console.log(TOKEN);

export const PUBLIC = axios.create({
  baseURL: "http://localhost:5000/",
});

export const API = axios.create({
  baseURL: "http://localhost:5000/",
  // headers: {
  //   Authorization: `Bearer ${
  //     JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.authData)
  //       ?.token
  //   }`,
  // },
});

export const userLogin = (data) => PUBLIC.post(`/users/login`, data);
export const userRegister = (data) => PUBLIC.post(`/users/register`, data);

API.interceptors.request.use((req) => {
  if (localStorage.getItem("persist:root")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authData)
        .token
    }`;
  }
  return req;
});

export const fetchPosts = (page) => PUBLIC.get(`/posts?page=${page}`);
export const getCommentsById = (id) => PUBLIC.get(`/posts/comment/${id}`);
export const commentPost = (data) => API.post(`/posts/comment/`, data);
export const searchPosts = (data) =>
  PUBLIC.get(
    `/posts/search?searchQuery=${data.search || "none"}&tags=${data.tags}`
  );
export const fetchPost = (id) => PUBLIC.get(`/posts/${id}`);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const createPost = (postData) => API.post(`/posts`, postData);
