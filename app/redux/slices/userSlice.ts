import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profession, USER } from "app/types";

import { RootState } from "app/redux/store";

const initialState: USER = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  profilePictureUrl: "",
  roleName: null,
  dateOfBirth: "",
  dateCreated: "",
  professions: [],
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<USER>) => {
      state = action.payload;
      return state;
    },
    updateUserProfessions: (state, action: PayloadAction<Profession[]>) => {
      state.professions = action.payload;
    },
    updateUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logoutUser: (state, action: PayloadAction<void>) => {
      return initialState;
    },
    updateUserProfilePicture: (state, action: PayloadAction<string>) => {
      state.profilePictureUrl = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice;
