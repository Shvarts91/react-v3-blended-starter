import axios from "axios";
import { Post, PostFormValues } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (searchText: string, page: number, limit: number) => {
  const response = await axios.get<Post[]>("/posts", {
    params: {
      _page: page,
      q: searchText,
      _limit: limit,
    },
  });
  const total = parseInt(response.headers["x-total-count"] || "0");

  return {
    posts: response.data,
    total,
  };
};

export const createPost = async (payload: PostFormValues): Promise<Post> => {
  const response = await axios.post("/posts", {
    title: payload.title,
    body: payload.body,
  });

  return response.data;
};

export const editPost = async (payload: PostFormValues) => {
  const response = await axios.patch(`/posts/${payload.id}`, {
    title: payload.title,
    body: payload.body,
  });

  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete(`/posts/${postId}`);

  return response;
};
