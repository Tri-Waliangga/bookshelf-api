import { nanoid } from "nanoid";
import books from "./bookshelf.js";

export const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

export const getBooksHandler = (request, h) => {
  const { reading, finished, name } = request.query;

  if (reading === "1") {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.reading === true)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading === "0") {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.reading === false)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished === "1") {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.readPage === b.pageCount)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished === "0") {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.readPage < b.pageCount)
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  if (typeof name === "string" && name.toLocaleLowerCase() === "dicoding") {
    const response = h.response({
      status: "success",
      data: {
        books: books
          .filter((b) => b.name.toLocaleLowerCase().includes("dicoding"))
          .map((b) => ({
            id: b.id,
            name: b.name,
            publisher: b.publisher,
          })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: books.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

export const getBookDetailByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

export const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const idxBook = books.findIndex((b) => b.id === bookId);
  const updatedAt = new Date().toISOString();

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (idxBook !== -1) {
    books[idxBook] = {
      ...books[idxBook],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

export const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const idxBook = books.findIndex((b) => b.id === bookId);

  if (idxBook !== -1) {
    books.splice(idxBook, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
