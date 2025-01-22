import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import ujianReducer from "./slices/ujianSlice"
import userReducer from "./slices/userSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer, 
    ujian: ujianReducer,
    user: userReducer,
  },
});
