import axios from "axios";
import { baseURL } from "./AuthApi";
import axiosInstance from "../Features/LoginPage/userLoginToken";

// like api call

export const likeOnClick = async (id) => {
  return axiosInstance.patch(
    `${baseURL}/news/${id}/like`,
    {},
    {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
    }
  );
};


export const unlikeOnClick = async (id) => {
  return axiosInstance.patch(
    `${baseURL}/news/${id}/unlike`,
    {},
    {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
    }
  );
};