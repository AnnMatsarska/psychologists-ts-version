import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPsychologist } from "../../@types/types";

interface PsychologistsState {
  data: IPsychologist[];
  currentPage: number;
  itemsPerPage: number;
  filter: string;
}

const initialState: PsychologistsState = {
  data: [],
  currentPage: 1,
  itemsPerPage: 3,
  filter: " ",
};

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    setPsychologists: (state, action: PayloadAction<IPsychologist[]>) => {
      state.data = action.payload;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    resetState: (state) => {
      state.data = [];
      state.currentPage = 1;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setPsychologists, nextPage, resetState, setFilter } =
  psychologistsSlice.actions;

export const selectPsychologists = (state: RootState) =>
  state.psychologists.data;
export const selectCurrentPage = (state: RootState) =>
  state.psychologists.currentPage;
export const selectItemsPerPage = (state: RootState) =>
  state.psychologists.itemsPerPage;
export const selectFilter = (state: RootState) => state.psychologists.filter;

export const psychologistsReducer = psychologistsSlice.reducer;
