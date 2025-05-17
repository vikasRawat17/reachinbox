import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import loginReducer from "./login/Login";
import inboxReducer from "./emails/Email";
import emailsReducer from "./emails/emailContent";

const rootReducer = combineReducers({
  login: loginReducer,
  inbox: inboxReducer,
  emails: emailsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
