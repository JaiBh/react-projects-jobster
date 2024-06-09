import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import axios from "axios";
import { clearStore } from "../features/user/userSlice";

const url = "https://redux-toolkit-jobster-api-server.onrender.com/api/v1";

export const customFetch = axios.create({
  baseURL: url,
});
customFetch.interceptors.request.use(
  (config) => {
    const user = getFromLocalStorage();
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
  }
  return thunkAPI.rejectWithValue(
    error?.response?.data?.msg ||
      "oops, there was a problem. Please try again later"
  );
};
