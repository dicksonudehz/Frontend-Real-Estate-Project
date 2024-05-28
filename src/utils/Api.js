import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  // baseURL: "http://localhost:8000/api"
  baseURL: "https://backend-real-estate-six.vercel.app/api"
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/getAll", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("something went wrong from api get all properties routes");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("something went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("something went wrong, please try again api register");
    throw error;
  }
};

export const bookAVisit = async (email, token, propertyId, date) => {
  try {
    await api.post(
      `/user/bookedVisit/${propertyId}`,
      { email, id: propertyId, date: dayjs(date).format("DD/MM/YY") },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("something went wrong, please try again api booked visit ");
    throw error;
  }
};

export const cancelABooking = async (email, token, id) => {
  try {
    await api.post(
      `/user/cancelABooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("something went wrong, please try again api cancel visit ");
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/addToFavorite/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error(
      "something went wrong, please try again api adding favorite residence"
    );
    throw error;
  }
};

export const getAllFavorites = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFavResidence`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data.favResidence;
    return data["faveResisdenceID"];
    {
    }
  } catch (err) {
    toast.error("something went wrong, please try again api all favorite");
    throw err;
  }
};

export const getAllBooking = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allBookedResidence`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data.bookings;
    return data["bookedVisits"];
    {
    }
  } catch (err) {
    toast.error("something went wrong, please try again api all favorite");
    throw err;
  }
};

export const createResidency = async (
  data,
  // title,
  // description,
  // price,
  // address,
  // country,
  // city,
  // facilities,
  // image,
  // userEmail,
  token
) => {
  console.log(data);
  try {
    const res = await api.post(
      `/residency/create`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
