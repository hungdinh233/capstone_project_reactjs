import { createSlice } from "@reduxjs/toolkit";
import { getStoreJson, http, USER_LOGIN } from "../../utils/tool";
import { getProfileApi } from "./userLoginReducer";


const initialState = {
  arrCart: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    getArrCartAction: (state, action) => {
      const productDetail = action.payload;
      let arrAddCart = [...state.arrCart];
      let index = arrAddCart.findIndex(
        (item) => item.name === productDetail.name
      );
      if (index === -1) {
        arrAddCart.push(productDetail);
      } else {
        arrAddCart[index].quantity += 1;
      }

      state.arrCart = arrAddCart;
    },
    quantityChangePlus: (state, action) => {
      let index = action.payload;
      let arrAddCart = [...state.arrCart];
      arrAddCart[index].quantity += 1;
      state.arrCart = arrAddCart;
    },
    quantityChangeMinus: (state, action) => {
        let index = action.payload;
        let arrAddCart = [...state.arrCart];
        arrAddCart[index].quantity -= 1;
        state.arrCart = arrAddCart;
      }
  },
});

export const { getArrCartAction, quantityChangePlus,quantityChangeMinus } = cartReducer.actions;

export default cartReducer.reducer;

//------------------------API--------------------------

export const submitActionApi = (arr)=>{
return async (dispatch) =>{
 
  try {
    console.log(arr);
    
    const result = await http.post("/Users/order", arr)
    
    alert(result.data.content);

  } catch (error) {
    console.log(error);
  }
}
}