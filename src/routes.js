import { addBookHandler, getBooksHandler } from "./handler.js";

export const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getBooksHandler
  },
];
