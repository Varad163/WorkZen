import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Restore saved user/token on page reload
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  loading: false,
  error: null,
};

// ------------------- Thunks -------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (form: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", form);
      return res.data; // must include { user, token }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (form: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post("/auth/signup", form);
      return res.data; // must include { user, token }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// ------------------- Slice -------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  // ⭐⭐ THIS IS WHERE YOU ADD YOUR CODE ⭐⭐
  extraReducers: (builder) => {
    // LOGIN SUCCESS
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    });

    // SIGNUP SUCCESS
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    });

    // PENDING STATE
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // ERROR STATE
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
