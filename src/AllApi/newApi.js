import axios from "axios";
import { baseURL } from "./AuthApi";

// like api call

export const likeOnClick = async (id) => {
  return axios.patch(
    `${baseURL}/news/${id}/like`,
    {},
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
};
