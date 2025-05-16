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

     
      const allEmails = response.data.data.reduce((unique, email) => {
        if (!unique.some((e) => e.id === email.id)) {
          unique.push(email);
        }
        return unique;
      }, []);

      
      const snoozedEmails = JSON.parse(
        localStorage.getItem("snoozedEmails") || "{}"
      );
      const currentTime = Date.now();

      
      const filteredEmails = allEmails.filter((email) => {
        const snoozeUntil = snoozedEmails[email.id];
        const shouldShow = !snoozeUntil || currentTime > snoozeUntil;

       
       

        return shouldShow;
      });

      
      const cleanedSnoozedEmails = { ...snoozedEmails };
      let hasChanges = false;

      Object.keys(cleanedSnoozedEmails).forEach((id) => {
        if (currentTime > cleanedSnoozedEmails[id]) {
          delete cleanedSnoozedEmails[id];
          hasChanges = true;
        }
      });

      
      if (hasChanges) {
        localStorage.setItem(
          "snoozedEmails",
          JSON.stringify(cleanedSnoozedEmails)
        );
      }

      return filteredEmails;
    } catch (error) {
      console.error("Error fetching emails:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const replyEmails = createAsyncThunk(
  "inbox/reply",
  async ({ id, mail }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.login.token;

    try {
      const response = await axios.post(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${id}`,
        mail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEmails = createAsyncThunk(
  "inbox/delete",
  async ({ id }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.login.token;

    try {
      const response = await axios.delete(
        `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
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
      })
      .addCase(replyEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(replyEmails.fulfilled, (state, action) => {})
      .addCase(replyEmails.rejected, (state, action) => {})
      .addCase(deleteEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmails.fulfilled, (state, action) => {
        const deletedId = action.meta.arg.id;
        state.emails = state.emails.filter((email) => email.id !== deletedId);
        state.selectedEmailId = null;
        state.status = "succeeded";
      })
      .addCase(deleteEmails.rejected, (state, action) => {});
  },
});

export const { selectEmail } = inboxSlice.actions;
const inboxReducer = inboxSlice.reducer;
export default inboxReducer;
