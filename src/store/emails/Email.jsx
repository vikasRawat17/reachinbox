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
        const snoozeData =
          snoozedEmails[email.threadId] || snoozedEmails[email.id];

        return (
          !snoozeData ||
          !snoozeData.snoozeUntil ||
          currentTime >= snoozeData.snoozeUntil
        );
      });

      const cleanedSnoozedEmails = { ...snoozedEmails };
      let hasChanges = false;

      Object.keys(cleanedSnoozedEmails).forEach((id) => {
        const snoozeData = cleanedSnoozedEmails[id];

        const snoozeUntil =
          typeof snoozeData === "object" ? snoozeData.snoozeUntil : snoozeData;

        if (currentTime >= snoozeUntil) {
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

export const snoozeEmail = createAsyncThunk(
  "inbox/snoozeEmail",
  async ({ id, duration = 60000 }, thunkAPI) => {
    if (!id) {
      return thunkAPI.rejectWithValue("Email ID is required");
    }

    try {
      const state = thunkAPI.getState();
      const email = state.inbox.emails.find(
        (e) => e.id === id || e.threadId === id
      );

      if (!email) {
        return thunkAPI.rejectWithValue("Email not found");
      }

      const snoozeData = {
        snoozeUntil: Date.now() + duration,
        subject: email.subject || "No Subject",
        emailId: email.id,
        threadId: email.threadId || email.id,
      };

      const existingSnoozed = JSON.parse(
        localStorage.getItem("snoozedEmails") || "{}"
      );

      existingSnoozed[id] = snoozeData;

      localStorage.setItem("snoozedEmails", JSON.stringify(existingSnoozed));

      thunkAPI.dispatch(fetchEmails());
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to snooze email");
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
    refreshInbox(state) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.emails = action.payload;

        if (
          state.selectedEmailId &&
          !action.payload.some(
            (email) =>
              email.id === state.selectedEmailId ||
              email.threadId === state.selectedEmailId
          )
        ) {
          state.selectedEmailId = null;
        }
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(snoozeEmail.fulfilled, (state, action) => {
        if (state.selectedEmailId === action.meta.arg.id) {
          state.selectedEmailId = null;
        }
      })
      .addCase(replyEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(replyEmails.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(replyEmails.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmails.fulfilled, (state, action) => {
        const deletedId = action.meta.arg.id;
        state.emails = state.emails.filter(
          (email) => email.id !== deletedId && email.threadId !== deletedId
        );
        state.selectedEmailId = null;
        state.status = "succeeded";
      })
      .addCase(deleteEmails.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { selectEmail, refreshInbox } = inboxSlice.actions;
const inboxReducer = inboxSlice.reducer;
export default inboxReducer;
