import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { loginApi } from "../../redux/reducers/userLoginReducer";
export default function Login() {
  const [passwordType, setPassWordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatch()
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng"),
      password: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(6, "Mật khẩu phải từ 6-32 ký tự")
        .max(32, "Mật khẩu từ 6-32 ký tự")
        .matches(
          "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$",
          "Mật khẩu không đúng định dạng"
        )
    }),
    onSubmit: (values) => {
        
        console.log(values);
        // const action = loginApi(values);
        dispatch(loginApi(values))
  
      },
  });
  const togglePassword = () => {
    if (passwordType === "password") {
      setPassWordType("text");
      return;
    }
    setPassWordType("password");
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <hr />
      <form
        className="form flex-wrap d-flex flex-column justify-content-between align-items-center"
        onSubmit={frm.handleSubmit}
      >
        <div className="form-group col-md-10 mb-4">
          <div className="input-group d-flex flex-column">
            <h2>Email</h2>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control input-sm w-100"
              placeholder="Email"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.email ? (
              <span className="text-danger">{frm.errors.email} </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group col-md-10 mb-4">
          <div className="input-group d-flex flex-column">
            <h2>Password</h2>
            <input
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
         <div className="text-center mt-2 register">
         <NavLink to="/register"> Regiter Now?</NavLink>
         </div>
        </div>
        <div className="form-group submit">
            
            <button type="submit">Login</button>
          </div>
      </form>
    </div>
  );
}
