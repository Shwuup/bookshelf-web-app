import axios from "axios";
import { BookStatus, Update } from "./types";

export const updateBookStatusApiCall = (
  bookStatus: BookStatus,
  token: string
) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/book/${bookStatus.book_status_id}/`,
    bookStatus,
    { headers: { Authorization: token } }
  );
};

export const createNewUpdate = (update: Update) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/api/updates/`, update);
};

export const getBook = (id: number) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/books/${id}/`);
};
