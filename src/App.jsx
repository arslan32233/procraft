import React from "react";
import Routes from "./routes.jsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./providers/store.js";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
