import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { debounce } from "lodash";
import Dropdown from "react-bootstrap/Dropdown";

import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";

export default function Search() {
    const { arrProduct } = useSelector((state) => state.productReducer);
    let [sortArray, setSortArray] = useState();
    const [inputText, setInputText] = useState("");
    
  

  
  let inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  
  };
  const debouceInputHandler = debounce(inputHandler, 500);

  useEffect(()=>{
    if(arrProduct){
      setSortArray(arrProduct)
    }
  },[arrProduct])

  useEffect(()=>{
    if(inputText){
      let sortArr = arrProduct.filter((item)=>{
        return item.name.toLowerCase().includes(inputText)
      })
      setSortArray(sortArr)
    }else{
      setSortArray(arrProduct)
    }
  },[inputText, arrProduct])

  // sortArray = arrProduct.filter((el) => {
    

  //   if (inputText === "") {
        
  //     return el;
  //   }
  //   //return the item which contains the user input
  //   else { 
        
  //     return el.name.toLowerCase().includes(inputText);
  //   }
  // });
  
  

  
//   console.log(sortArray);
  
 

  const sortByPriceAscending = (sort) => {
   const newArr = [...sortArray]
    if (sort === "ascending") {
        newArr.sort((a, b) => a.price - b.price);
    }
    if (sort === "decrease") {
        newArr.sort((a, b) => b.price - a.price);
    }
  
    setSortArray(newArr)
  };

  return (
    <div className="container" style={{ marginTop: "68px" }}>
      <h2>Search</h2>
      <div className="search mb-5">
        <input
          type="text"
          placeholder="Product name"
          onChange={debouceInputHandler}
        />
        <button className="searchSubmit" onSubmit={inputHandler}>
          Search
        </button>
      </div>
      <h1 className="title">Search Result</h1>

      <DropdownButton id="dropdown-item-button" title="Sort">
        <Dropdown.Item
          as="button"
          onClick={() => {
            sortByPriceAscending("decrease");
            
          }}
        >
          Decrease
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            sortByPriceAscending("ascending")
            ;
          }}
        >
          Ascending
        </Dropdown.Item>
      </DropdownButton>

      <div className="result d-flex flex-wrap">
        {sortArray?.map((prod, index) => {
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
                  <NavLink to={`/detail/${prod.id}`}>Buy now</NavLink>
                  <p>{prod.price}$</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}