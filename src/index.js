import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import VideoCam from "./components/VideoCam";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import ProductPage from "./components/ProductsPage";
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="/capture" element={<VideoCam />} />

          <Route exact path="/product" element={<ProductPage />} />
        </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
