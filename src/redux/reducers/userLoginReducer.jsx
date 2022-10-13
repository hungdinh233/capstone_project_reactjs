import { createSlice } from "@reduxjs/toolkit";
import { history } from "../..";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_FAVORITE,
  USER_LOGIN,
} from "../../utils/tool";

const initialState = {
  userLogin: getStoreJson(USER_LOGIN) || {},
  userFavorite: getStoreJson(USER_FAVORITE) || {}
};

const userRegisterReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getFavoriteAction: (state,action)=>{
      state.userFavorite = action.payload
      
    }
  },
});

export const { getProfileAction,getFavoriteAction } = userRegisterReducer.actions;

export default userRegisterReducer.reducer;

export const loginApi = (userLogin) => {
 
  return async (dispatch) => {
    try {
      const result = await http.post('/Users/signin', userLogin);
      console.log(userLogin);
      // đăng nhập thành công lưu dữ liệu vào store , cookies
      
      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);
      dispatch(getProfileApi());
      history.push("/profile");
    } catch (error) {
      console.log(error);
      history.push("");
    }
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/getProfile");
      const action = getProfileAction(result.data.content);
      dispatch(action);
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (error) {
      console.log(error);
    }
  };
};
 export const getFavoriteApi = ()=>{
  return async (dispatch) =>{
    try {
      const result = await http.get('/Users/getproductfavorite');
      const action = getFavoriteAction(result.data.content);
      dispatch(action)
      setStoreJson(USER_FAVORITE,result.data.content)
    } catch (error) {
      console.log(error);
      
    }
  }
 }
