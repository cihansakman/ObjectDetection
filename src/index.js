import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import VideoCam from "./components/VideoCam";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import { Provider } from "react-redux";
//import { store } from "./store/redux/store";
import ProductPage from "./components/ProductsPage";

//Persistant
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/redux/store";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(store);
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />

            <Route exact path="/capture" element={<VideoCam />} />

            <Route exact path="/product" element={<ProductPage />} />
          </Routes>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
