import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { LogoutArgs } from '../types/authTypes';

const URL='http://localhost:3000/api/auth/logout/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const logoutAPI = createAsyncThunk<any, LogoutArgs,{rejectValue: string}>(
  'logout/logoutAPI', 
  async function (arg, {rejectWithValue}) { 

    const options = {
      headers: {'Authorization':`Bearer ${arg.token}`},
    }; 
  
   // axios.post<URL type, response type, config type>
   return await axios.post<string, any>(URL, options)
    .then((res) => {
      // Signed up 
     
      return res;
      // ...
    })
    .catch((error) => {

      return rejectWithValue(error.message)
    });
});

export default logoutAPI