import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inbox: [],
  selectedEmail: null,
  loadingInbox: false,
  loadingEmail: false,
  error: null,
};

export const fetchEmailById = createAsyncThunk(
  "emails/fetchEmailById",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.login.token;
    try {
      const response = await axios.get(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    clearSelectedEmail(state) {
      state.selectedEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchEmailById.pending, (state) => {
        state.loadingEmail = true;
        state.error = null;
      })
      .addCase(fetchEmailById.fulfilled, (state, action) => {
        state.loadingEmail = false;
        state.selectedEmail = action.payload.data;
      })
      .addCase(fetchEmailById.rejected, (state, action) => {
        state.loadingEmail = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedEmail } = emailsSlice.actions;

export default emailsSlice.reducer;
