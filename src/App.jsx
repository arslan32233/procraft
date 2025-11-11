import React from "react";
import Routes from "./routes.jsx";
import { Provider } from "react-redux";
import store from "./providers/store.js";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
