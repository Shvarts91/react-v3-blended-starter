import axios from "axios";
import type { Photo } from "../types/photo";

interface PhotoResponse {
  data: Photo[];
}

interface FetchPhotosHttpResponse {
  photos: Photo[];
}

export const getPhotos = async (query: string): Promise<PhotoResponse> => {
  const response = await axios.get<FetchPhotosHttpResponse>(
    `https://api.pexels.com/v1/search?`,
    {
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
      },
      params: {
        query,
        orientation: "landscape",
      },
    }
  );

  console.log(response);

  return {
    data: response.data.photos,
  };
};
