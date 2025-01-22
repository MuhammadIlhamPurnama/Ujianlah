import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

// Async action untuk login
export const login = (formData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post("/login", 
      formData,
    );
    console.log(response)

    if(response.data.success) {
      localStorage.setItem('auth-token', response.data.token);
      window.location.replace('/platform');
    } else {
      alert(response.data.errors)
    }

    dispatch(
      loginSuccess({
        token: response.data.token,
      })
    );
  } catch (error) {
    const message = error.response?.message || "Login failed";
    dispatch(loginFailure(message));
  }
};

// Async action untuk register
export const register = (formData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post("/signup", 
      formData
    );

    if (response.data.success) {
      localStorage.setItem('auth-token', response.data.token)
      window.location.replace('/platform');
    } else {
      alert(response.data.errors)
    }

    dispatch(
      loginSuccess({
        token: response.data.token,
      })
    );
  } catch (error) {
    const message = error.response?.message || "Registration failed";
    dispatch(loginFailure(message));
  }
};

// Initial state untuk auth
const initialState = {
  token: null,
  loading: false,
  error: null,
};

// Slice untuk auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null; // Reset error saat memulai login/register
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.error = null;
    },
    setAuth: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setAuth } =
  authSlice.actions;

export default authSlice.reducer;
