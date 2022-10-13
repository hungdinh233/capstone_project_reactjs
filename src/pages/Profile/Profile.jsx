import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import eye from "../../assets/img/Color.png";
import * as Yup from "yup";
import { ACCESS_TOKEN, getStore, http } from "../../utils/tool";
import { Account } from "../../Model/Model";
import axios from "axios";
import { history } from "../..";
import {
  getFavoriteAction,
  getFavoriteApi,
  getProfileApi,
} from "../../redux/reducers/userLoginReducer";
import { Navigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

export default function Profile() {
  const { userLogin, userFavorite } = useSelector(
    (state) => state.userLoginReducer
  );

  const dispatch = useDispatch();
  const [passwordType, setPassWordType] = useState("password");
  

  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  useEffect(() => {
    dispatch(getProfileApi());
    dispatch(getFavoriteApi());
  }, []);

  const togglePassword = () => {
    if (passwordType === "password") {
      setPassWordType("text");
      return;
    }
    setPassWordType("password");
  };
  

  const [update, setUpdate] = useState({
    email: userLogin.email,
    name: userLogin.name,
    phone: userLogin.phone,
    gender: true,
  });
  const frm = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      gender: true,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Tên không được để trống")
        .matches(
          "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$",
          "Tên không đúng định dạng"
        ),
      phone: Yup.string()
        .required("Số điện thoại không được bỏ trống")
        .matches(
          "^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$",
          "Số điện thoại không đúng định dạng"
        ),
      password: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải từ 6-32 ký tự")
        .max(32, "Mật khẩu từ 6-32 ký tự")
        .matches(
          "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$",
          "Mật khẩu không đúng định dạng"
        ),
    }),
    onSubmit: (values) => {
      let newAcc = new Account();
      newAcc.email = userLogin.email;
      newAcc.password = values.password;
      newAcc.name = values.name;
      newAcc.gender = values.gender;
      newAcc.phone = values.phone;
      if (newAcc.gender === "true") {
        newAcc.gender = true;
      } else {
        newAcc.gender = false;
      }

      (async () => {
        try {
          const result = await http.post("/Users/updateProfile", newAcc);
          alert(result.data.content);
        } catch (error) {
          alert(error.data.content);
          return;
        }
      })();
    },
  });
  const handleRadioButtons = (e) => (frm.values.gender = e.target.value);
  if (!getStore(ACCESS_TOKEN)) {
    //Nếu chưa đăng nhập => Chuyển hướng trang
    alert("Đăng nhập để vào trang này !");
    return <Navigate to="/login" />;
  }
  const handleChangeInput = (e) => {
    let { id, value } = e.target;
    let dataType = e.target.getAttribute("data-type");
    let newValue = { ...update };
    newValue[id] = value;
    setUpdate({ update: newValue });
  };

  return (
    <div className="update">
      <h2 className="title">Profile</h2>
      <div className="container d-flex h-100">
        <div className="image col-2">
          <img src={userLogin.avatar} alt={userLogin.name} className="w-100" />
        </div>
        <form
          className="form d-flex flex-wrap justify-content-start col-10 "
          onSubmit={frm.handleSubmit}
        >
          <div className="form-group col-md-10 mb-4 me-5">
            <div className="input-group d-flex flex-column">
              <h2>Email</h2>
              <input
                data-type="email"
                type="email"
                name="email"
                id="staticEmail"
                className="form-control input-sm w-100"
                placeholder="Email"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
                value={userLogin.email}
                readonly=""
              />
              {frm.errors.email ? (
                <span className="text-danger">{frm.errors.email} </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group col-md-10 mb-4 me-5">
            <div className="input-group d-flex flex-column">
              <h2>Name</h2>
              <input
                data-type="name"
                type="text"
                name="name"
                id="name"
                className="form-control input-sm w-100"
                placeholder="Name"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
                value={update.name}
                onInput={handleChangeInput}
              />

              <span className="text-danger">{frm.errors.name} </span>
            </div>
          </div>

          <div className="form-group col-md-10 mb-4 me-5">
            <div className="input-group d-flex flex-column">
              <h2>Phone</h2>
              <input
                data-type="phone"
                type="text"
                name="phone"
                id="phone"
                className="form-control input-sm w-100"
                placeholder="Phone"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
                value={update.phone}
                onInput={handleChangeInput}
              />
              <span className="text-danger">{frm.errors.phone} </span>
            </div>
          </div>
          <div className="form-group col-md-10 mb-4 me-5">
            <div className="input-group d-flex flex-column">
              <h2>Password</h2>
              <input
                data-type="password"
                type={passwordType}
                name="password"
                className="form-control input-sm w-100"
                placeholder="Password"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
                onInput={handlePasswordChange}
                value={passwordInput}
              />

              <span className="text-danger">{frm.errors.password} </span>
            </div>
            <button type="button" onClick={togglePassword}>
              {passwordType === "password" ? (
                <i className="bi bi-eye-slash"></i>
              ) : (
                <i className="bi bi-eye"></i>
              )}
            </button>
          </div>

          <div className="form-group col-md-10">
            <div className="input-group" id="gender">
              <p>Gender</p>
              <input
                data-type="gender"
                type="radio"
                id="Male"
                name="Choose"
                value={true}
                onChange={(e) => handleRadioButtons(e)}
              />
              <label htmlFor="Male" className="radio-label">
                <span className="text-dark d-block ps-2">Male</span>
              </label>
              <input
                type="radio"
                id="Female"
                name="Choose"
                value={false}
                onChange={(e) => handleRadioButtons(e)}
              />
              <label htmlFor="Female" className="radio-label">
                <span className="text-dark d-block">Female</span>
              </label>

              <button className="updateButton rounded-pill" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div className="container order d-flex align-items-start flex-wrap">
        <div
          className="nav flex-row nav-pills me-3 col-10"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active"
            id="v-pills-history-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-history"
            type="button"
            role="tab"
            aria-controls="v-pills-history"
            aria-selected="true"
          >
            Order History
          </button>
          <button
            className="nav-link"
            id="v-pills-favorite-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-favorite"
            type="button"
            role="tab"
            aria-controls="v-pills-favorite"
            aria-selected="false"
          >
            Favorite
          </button>
        </div>
        <div className="tab-content col-10" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-history"
            role="tabpanel"
            aria-labelledby="v-pills-history-tab"
          >
            {userLogin?.ordersHistory?.map((orderItem, index) => {
              return (
                <div className="cover mt-2" key={index}>
                  <hr />
                  <p>+ Order has been placed on {orderItem.date}</p>
                  <table className="table">
                    <thead className="bg-light">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    {orderItem?.orderDetail?.map((item, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td>{orderItem.id}</td>
                            <td>
                              <img
                                src={item.image}
                                alt={item.name}
                                height={50}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}$</td>
                            <td>{item.quantity}</td>
                            <td>
                              {(item.price * item.quantity).toLocaleString()}
                              $
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              );
            })}
          </div>

          <div
            className="tab-pane fade"
            id="v-pills-favorite"
            role="tabpanel"
            aria-labelledby="v-pills-favorite-tab"
          >
            <div className="mt-2">
              <hr />

              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                  </tr>
                </thead>
                {userFavorite?.productsFavorite?.map((itemFavorite, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{itemFavorite.id}</td>
                        <td>{itemFavorite.name}</td>
                        <td>
                          <img
                            src={itemFavorite.image}
                            alt={itemFavorite.name}
                            height={50}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
      );
    </div>
  );
}
