import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { ReVerifyArgs } from '../types/authTypes'

const URL = 'https://pill-server.onrender.com/api/auth/verify';
// createAsyncThunk<return data type, arg type, rejectValue type>
export const reVerifyAPI = createAsyncThunk<any, ReVerifyArgs, {rejectValue: string}>(
  'reVerify/reVerifyAPI', 
  async function (arg, {rejectWithValue}) {

    const config = {
      data: {email: arg.email}
    }; 
  
   // axios.post<URL type, response type, config type>
   return await axios.post<string, ReVerifyArgs>(URL, config)
    .then((res) => {
      // Signed up 
      return res;
      // ...
    })
    .catch((error) => {
      return rejectWithValue(error.response.data.message)
    });
});

export default reVerifyAPI