import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookLists: [],
};

export const bookManagementSlice = createSlice({
  name: "bookManagement",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.bookLists = action.payload;
    },
    addBook: (state, action) => {
      state.bookLists.push(action.payload);
    },
    updateBook: (state, action) => {
      const { id, title, author, published_year, genre, status, summary } =
        action.payload;

      const existingBook = state.bookLists.find((book) => book.id === id);

      if (existingBook) {
        existingBook.title = title;
        existingBook.author = author;
        existingBook.published_year = published_year;
        existingBook.genre = genre;
        existingBook.status = status;
        existingBook.summary = summary;
      }
    },
    deleteBook: (state, action) => {
      const { id } = action.payload;
      state.bookLists = state.bookLists.filter((book) => book.id !== id);
    },
  },
});

export const { setBooks, addBook, updateBook, deleteBook } =
  bookManagementSlice.actions;

export default bookManagementSlice.reducer;
