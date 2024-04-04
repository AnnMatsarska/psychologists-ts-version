import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IPsychologist } from "../../@types/types";

interface FavoritesState {
  items: IPsychologist[];
}

const favoritesInitialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: favoritesInitialState,
  reducers: {
    addItem(state, action: PayloadAction<IPsychologist>) {
      state.items.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    resetItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, deleteItem, resetItems } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites?.items;

export const favoritesReducer = favoritesSlice.reducer;
