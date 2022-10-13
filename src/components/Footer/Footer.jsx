import React from "react";
import { NavLink } from "react-router-dom";


export default function Footer() {
  return (
    <footer class="footer">
      <div class="container">
        <div class="info-up">
          <div class="row align-items-start">
            <div class="col-12 col-md-6 col-xl-4 pb-sm-3 contact">
              <h2>GET HELP</h2>
              <a href="#">Home</a>
              <a href="#">Nike</a>
              <a href="#">Adidas</a>
              <a href="#">Contact</a>
            </div>
            <div class="col-12 col-md-6 col-xl-4 pb-sm-3 contact">
              <h2>SUPPORT</h2>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Help</a>
              <a href="#">Phone</a>
            </div>
            <div class="col-12 col-md-6 col-xl-4 contact">
              <h2>REGISTER</h2>
              
              <NavLink to="/register" id="register">
                Resiter
              </NavLink>
              <NavLink to="/login" id="login">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
