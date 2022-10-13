import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../utils/tool";

const initialState = {
  arrProduct: [],
  productDetail:{}
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      // lấy dữ liệu
      const arrProduct = action.payload;
      state.arrProduct = arrProduct;
    },
    getProductActionDetail:(state,action)=>{
        const productDetail = action.payload;
        state.productDetail = productDetail;

    }
  },
});

export const { getProductAction ,getProductActionDetail} = productReducer.actions;

export default productReducer.reducer;

// ------------action API------------------

export const getProductApi = () => {
  return async (dispatch2) => {
    try {
      const result = await http.get("/product");
      const action = getProductAction(result.data.content);

      dispatch2(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getProductDetailApi =(id)=>{
    return async (dispatch)=>{
        try {
            let result = await http.get(`/Product/getbyid?id=${id}`)
            const action = getProductActionDetail(result.data.content);
            dispatch(action)

        } catch (error) {
            
        }
    }
}
