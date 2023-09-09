import { createSlice } from '@reduxjs/toolkit';

// Part1: Define Slice (including reducers and actions)
const currentPage = 0;//default page
const initialState = { currentPage };
const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// export state to global
export const selectPageState = (state) => state.page.currentPage;

// export actions to global
export const { setPage } = pageSlice.actions;

// export reducer to global
export default pageSlice.reducer;