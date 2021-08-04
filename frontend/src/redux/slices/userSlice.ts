import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URI } from "../../config";
import { IUser } from "../../types/types";

import { RootState } from "../store";

interface IToken {
  authorization: string;
}

export interface UserState {
  token: string;
  user: IUser;
  loading: boolean;
  error: SerializedError | undefined;
}

interface ILoginInput {
  usernameOrEmail: string;
  password: string;
}

interface IRegisterInput extends IUser {
  password: string;
  confirmPassword: string;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || "",
  user: { email: "", username: "" },
  loading: false,
  error: undefined,
};

export const login = createAsyncThunk<
  IToken,
  ILoginInput,
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
  IRegisterInput,
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

export const getUser = createAsyncThunk<
  IUser,
  void,
  {
    state: RootState;
    rejectValue: SerializedError;
  }
>("user/getUser", async (_, { rejectWithValue, getState }) => {
  try {
    const response = await axios.get<IUser>(`${API_URI}users/user`, {
      headers: { authorization: getState().token.token },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

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
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.token;

export default userSlice.reducer;
