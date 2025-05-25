import axios from "axios";
import type { Photo } from "../types/photo";

axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = import.meta.env.API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

interface PhotoResponse {
  data: Photo[];
}

export const getPhotos = async (query: string): Promise<PhotoResponse> => {
  // const response = await axios.get(`search?query=${query}`);
  console.log(import.meta);
  const response = await axios.get(`https://api.pexels.com/v1/`, {
    headers: {
      Authorization: "563492ad6f9170000100000108dc2880626e4436b3634ce1cf6b4d74",
    },
    params: {
      query,
      orientation: "landscape",
    },
  });

  return response.data.photos;
};
