import { createSlice } from "@reduxjs/toolkit";
const jobslice = createSlice({
  name: "job",
  initialState: {
    alljobs: [],
    singljob: null,
    alladminjobs: [],
    searchJobByText: "",
    allaplidejobs: [],
    searchedquery: "",
  },
  reducers: {
    setalljobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setsingljob: (state, action) => {
      state.singljob = action.payload;
    },
    setAlladminjobs: (state, action) => {
      state.alladminjobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllaplidejobs: (state, action) => {
      state.allaplidejobs = action.payload;
    },
    setSearchedquery: (state, action) => {
      state.searchedquery = action.payload;
    },
  },
});
export const {
  setalljobs,
  setsingljob,
  setAlladminjobs,
  setSearchJobByText,
  setAllaplidejobs,
  setSearchedquery,
} = jobslice.actions;
export default jobslice.reducer;
