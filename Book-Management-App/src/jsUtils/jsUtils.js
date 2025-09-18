import axios from "axios";

const BASE_URL = "http://localhost:3000/books";

export const getBooks = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: { _page: page, _per_page: limit },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching books:", err.message);
  }
};

export const getBookById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching book", err.message);
  }
};

export const addBook = async (newBook) => {
  try {
    const res = await axios.post(BASE_URL, newBook);
    return res.data;
  } catch (err) {
    console.error("Error adding new book", err.message);
  }
};

export const updateBook = async (book) => {
  try {
    const res = await axios.put(`${BASE_URL}/${book.id}`, book);
    return res.data;
  } catch (err) {
    console.error("Error updating book", err.message);
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting book", err.message);
  }
};
