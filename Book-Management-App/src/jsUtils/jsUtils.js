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
  } catch (error) {
    console.error("Error fetching books:", error.message);
  }
};
