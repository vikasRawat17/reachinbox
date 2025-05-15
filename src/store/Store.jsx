import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "./emails/Email";
import emailsReducer from "./emails/emailContent";
import loginReducer from "./login/Login";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    inbox: inboxReducer,
    emails: emailsReducer,
  },
});
