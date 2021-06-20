import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../../config";

import { RootState } from "../store";

interface IToken {
  authorization: string;
}

export interface UserState {
  token: string;
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || "",
  loading: false,
  error: undefined,
};

export const login = createAsyncThunk<
  IToken,
  { usernameOrEmail: string; password: string },
  { rejectValue: SerializedError }
>("user/login", async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post<IToken>(
      `${API_URI}users/login`,
      values
    );
    return response.headers;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk<
  IToken,
  {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  { state: RootState; rejectValue: SerializedError }
>("user/register", async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post<IToken>(
      `${API_URI}users/register`,
      values
    );
    return response.headers;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// export const checkToken = createAsyncThunk<s

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.authorization;
        localStorage.setItem("token", action.payload.authorization);
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.authorization;
        localStorage.setItem("token", action.payload.authorization);
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.token;

export default userSlice.reducer;
