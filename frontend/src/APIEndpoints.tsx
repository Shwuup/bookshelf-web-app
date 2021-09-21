import axios from "axios";
import { Update } from "./types";

export const getBookStatusByBook = (userId: number, bookId: number) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/users/${userId}/shelf/?filter=book&book-id=${bookId}`
  );
};

export const putBookStatus = (
  bookStatus: any,
  token: string,
  userId: number
) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/users/${userId}/shelf/`,
    bookStatus,
    { headers: { Authorization: token } }
  );
};

export const postUpdate = (update: Update, userId: number, token: string) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/users/${userId}/updates/`,
    update,
    { headers: { Authorization: token } }
  );

export const getBook = (id: number) =>
  axios.get(`${process.env.REACT_APP_API_URL}/books/${id}/`);

export const postBookStatus = (
  bookStatus: any,
  userId: number,
  token: string
) =>
  axios.post(
    `${process.env.REACT_APP_API_URL}/users/${userId}/shelf/`,
    bookStatus,
    { headers: { Authorization: token } }
  );

export const getBookStatuses = (userId: number) =>
  axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/shelf/`);
