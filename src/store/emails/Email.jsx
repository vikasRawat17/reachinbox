import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  emails: [],
  selectedEmailId: null,
  status: "idle",
  error: null,
};

export const fetchEmails = createAsyncThunk(
  "inbox/fetchEmails",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.login.token;

    try {
      const response = await axios.get(
        "https://hiring.reachinbox.xyz/api/v1/onebox/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    selectEmail(state, action) {
      state.selectedEmailId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectEmail } = inboxSlice.actions;
const inboxReducer = inboxSlice.reducer;
export default inboxReducer;
