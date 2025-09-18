import axios from "axios";

const BASE_URL = "http://localhost:3000/books";

export const getBooks = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        _page: page,
        _per_page: limit,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching books:", err.message);
  }
};

export const addBook = async (newBook) => {
  try {
    const res = await axios.post(BASE_URL, newBook);
    return res.data;
  } catch (err) {
    console.error("Error adding new Book", err.message);
  }
};
