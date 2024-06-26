import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CurrentUser } from "../../@types/types";

interface User {
  currentUser: CurrentUser | null;
}

const initialState: User = {
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users;

export const usersReducer = usersSlice.reducer;
