import {
  addBookHandler,
  getBooksHandler,
  getBookDetailByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} from "./handler.js";

export const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookDetailByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];
