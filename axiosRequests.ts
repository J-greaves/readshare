import axios, { AxiosResponse } from "axios";
import { Book, Friend, User } from "./types";

const BASE_URL = "https://hosting-api-yiyu.onrender.com/api";

const getLibrary = (username: string): Promise<AxiosResponse<Book[]>> => {
  return axios.get<Book[]>(`${BASE_URL}/users/${username}/books`);
};

const getWishlist = (username: string): Promise<AxiosResponse<Book[]>> => {
  return axios.get<Book[]>(`${BASE_URL}/users/${username}/wishlist`);
};

const postLibrary = (username: string, data: Book): Promise<AxiosResponse<Book>> => {
  return axios.post<Book>(`${BASE_URL}/users/${username}/books`, data);
};

const postWishlist = (username: string, data: Book): Promise<AxiosResponse<Book>> => {
  return axios.post<Book>(`${BASE_URL}/users/${username}/wishlist`, data);
};

const getLibraryBook = (username: string, bookId: string): Promise<AxiosResponse<Book>> => {
  return axios.get<Book>(`${BASE_URL}/users/${username}/books/${bookId}`);
};

const getWishlistBook = (username: string, bookId: string): Promise<AxiosResponse<Book>> => {
  return axios.get<Book>(`${BASE_URL}/users/${username}/wishlist/${bookId}`);
};

const deleteLibraryBook = (username: string, bookId: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/users/${username}/books/${bookId}`);
};

const deleteWishlistBook = (username: string, bookId: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/users/${username}/wishlist/${bookId}`);
};

const postFriendRequest = (username: string, data: { username: string }): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}/users/${username}/friendrequests`, data);
};

const getFriendRequests = (username: string): Promise<AxiosResponse<Friend[]>> => {
  return axios.get<Friend[]>(`${BASE_URL}/users/${username}/friendrequests`);
};

const getFriends = (username: string): Promise<AxiosResponse<Friend[]>> => {
  return axios.get<Friend[]>(`${BASE_URL}/users/${username}/friends`);
};

const acceptFriendRequest = (username: string, data: { username: string }): Promise<AxiosResponse> => {
  return axios.post(`${BASE_URL}/users/${username}/acceptfriend`, data);
};

const deleteFriendRequest = (username: string, toReject: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/users/${username}/friendrequests/${toReject}`);
};

const getUser = (username: string): Promise<AxiosResponse<User>> => {
  return axios.get<User>(`${BASE_URL}/users/${username}`);
};

const deleteFriend = (username: string, toDelete: string): Promise<AxiosResponse> => {
  return axios.delete(`${BASE_URL}/users/${username}/friends/${toDelete}`);
};

const getLendableFriends = (username: string): Promise<AxiosResponse<Book[]>> => {
  return axios.get<Book[]>(`${BASE_URL}/users/${username}/books?lendable=true`);
};

const getBorrowingList = (username: string): Promise<Book[]> => {
  return axios
    .get<Book[]>(`${BASE_URL}/users/${username}/borrowing`)
    .then((response) => response.data);
};

const getLendingList = (username: string): Promise<Book[]> => {
  return axios
    .get<Book[]>(`${BASE_URL}/users/${username}/lending`)
    .then((response) => response.data);
};

const postBookBorrowRequest = (
  borrowerUsername: string,
  bookId: string,
  ownerUsername: string
): Promise<AxiosResponse> => {
  return axios.post(
    `${BASE_URL}/users/${borrowerUsername}/books/${bookId}/requestlend/${ownerUsername}`
  );
};

const deleteBookBorrowRequest = (
  borrowerUsername: string,
  bookId: string
): Promise<AxiosResponse> => {
  return axios.delete(
    `${BASE_URL}/users/${borrowerUsername}/borrowrequest/${bookId}`
  );
};

const acceptBookBorrowRequest = (
  ownerUsername: string,
  bookId: string,
  borrowerUsername: string
): Promise<AxiosResponse> => {
  return axios.post(
    `${BASE_URL}/users/${ownerUsername}/books/${bookId}/acceptrequest/${borrowerUsername}`
  );
};

const returnBookAfterBorrow = (
  borrowerUsername: string,
  ownerUsername: string,
  bookId: string
): Promise<AxiosResponse> => {
  return axios.delete(
    `${BASE_URL}/users/${borrowerUsername}/returnbook/${ownerUsername}/${bookId}`
  );
};

const getBorrowRequests = (username: string, bookId: string): Promise<AxiosResponse> => {
  return axios.get(`${BASE_URL}/users/${username}/books/${bookId}/requestlist`);
};

const getAllBorrowRequests = (username: string): Promise<Book[]> => {
  return axios
    .get<Book[]>(`${BASE_URL}/users/${username}/requestborrow`)
    .then((response) => response.data);
};

const postNewUser = (data: User): Promise<AxiosResponse<User>> => {
  return axios.post<User>(`${BASE_URL}/users/newuser`, data);
};

const functions = {
  getLibrary,
  getWishlist,
  postLibrary,
  postWishlist,
  getLibraryBook,
  getWishlistBook,
  deleteLibraryBook,
  deleteWishlistBook,
  postFriendRequest,
  getFriendRequests,
  getFriends,
  acceptFriendRequest,
  deleteFriendRequest,
  getUser,
  deleteFriend,
  getLendableFriends,
  getBorrowingList,
  getLendingList,
  postBookBorrowRequest,
  deleteBookBorrowRequest,
  acceptBookBorrowRequest,
  returnBookAfterBorrow,
  getBorrowRequests,
  getAllBorrowRequests,
  postNewUser,
};

export default functions;
