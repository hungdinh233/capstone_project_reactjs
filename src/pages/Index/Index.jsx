import Carousel from "react-bootstrap/Carousel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductApi } from "../../redux/reducers/productReducer";
import { NavLink } from "react-router-dom";

export default function Index() {
  const { arrProduct } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  const getAllProductApi = () => {
    const actionThunk = getProductApi();
    dispatch(actionThunk);
  };

  useEffect(() => {
    getAllProductApi();
  }, []);

  const renderProduct = () => {
    return arrProduct.map((prod, index) => {
      return (
        <div className="item col-12 col-md-6 col-xl-4 " key={index}>
          <div className="cover">
            <div className="pro-image">
              <img src={prod.image} className="w-100" alt="photo.png" />
            </div>
            <d className="pro-txt">
              <h2>{prod.name}</h2>
              <span>{prod.description}</span>
            </d>
            <div className="buy-click d-flex">
              <NavLink to={`/detail/${prod.id}`} >Buy now</NavLink>
              <p>{prod.price}</p>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderProductCarousel = () => {
    return arrProduct.map((prod, index) => {
      return (
        <Carousel.Item>
          <div
            className="carousel-item active d-lg-flex justify-content-between align-items-center"
            key={index}
          >
            <div className="image-shoes col-7">
              <img src={prod.image} className="d-block" alt={prod.image} />
            </div>
            <div className="content-right col-4">
              <h1>{prod.name}</h1>
              <p>{prod.description}</p>
              <NavLink to={`/detail/${prod.id}`} >Buy now</NavLink>
            </div>
          </div>
        </Carousel.Item>
      );
    });
  };

  return (
    <>
      <section className="carousel">
        <div className="container">
          <Carousel>
            {renderProductCarousel()}</Carousel>
        </div>
      </section>
      <section className="product-feature">
        <h1>-Product Feature -</h1>
        <div className="container">
          <div className="row">{renderProduct()}</div>
        </div>
      </section>
    </>
  );
}

/**
 


 */
