import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import image from '../../assets/img/image 3.png'

export default function Header() {
  const {arrCart} = useSelector(state => state.cartReducer)

  const numberItem = arrCart.length
  return (
    <div>
  <header className="header">
    <div className="sub-header">
      <div className="container">
        <div className="content d-flex justify-content-between">
          <div className="header-left">
            <NavLink to="" className="text-decoration-none">
              <img src={image} alt="logo.png" />
            </NavLink>
          </div>
          <div className="header-right d-flex">
          <NavLink to="/search" className="text-white text-decoration-none me-2">Search</NavLink>
            <div className="cover">
              
              <NavLink to="/cart" className="d-flex text-decoration-none">
                <i className="fa-solid fa-cart-shopping text-white" />
                <p className="text-white">({numberItem})</p>
              </NavLink>
            </div>
            

            <NavLink to="/login" className="text-white text-decoration-none">Login</NavLink>
            <NavLink to="/register" className="text-white text-decoration-none">Register</NavLink>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="menu d-flex">
        <span className="link"><NavLink to="">Home</NavLink></span>
        <span className="link"><a href="#">Men</a></span>
        <span className="link"><a href="#">Woman</a></span>
        <span className="link"><a href="#">Kid</a></span>
        <span className="link"><a href="#">Sport</a></span>
      </div>
    </div>
  </header>
  

  

  
</div>
  )

}
