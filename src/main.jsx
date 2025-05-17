import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { routes } from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/Store";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter(routes);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
