import { addBookHandler } from "./handler.js";

export const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
];
