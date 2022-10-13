import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index/Index";

import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import Detail from "./pages/Detail/Detail";
import Register from "./pages/Register/Register";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import { createBrowserHistory } from "history";
import Profile from "./pages/Profile/Profile";
import 'bootstrap/dist/css/bootstrap.css';

import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";

import "./index.css";
import "./assets/scss/styles.scss";
import 'antd/dist/antd.css';


export const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
   
      <Routes>
        <Route path="" element={<App />}>
          <Route index path="" element={<Index />}></Route>
          <Route path="detail">
            <Route path=":id" element={<Detail/>}></Route>
          </Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="profile" element={<Profile/>}></Route>
          <Route path="search" element={<Search/>}></Route>
          <Route path="cart" element={<Cart/>}></Route>
         

        </Route>
      </Routes>

    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

