import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./reducers/cartReducer"
import productReducer from "./reducers/productReducer"
import userLoginReducer from "./reducers/userLoginReducer"


export const store = configureStore({
    reducer:{
        productReducer:productReducer,
        userLoginReducer:userLoginReducer,
        cartReducer:cartReducer
    }
})