import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { SignInArgs } from '../types/authTypes'
import { SignInRes } from '../types/authTypes'

const URL = 'https://pill-server.onrender.com/api/auth/signin';
// createAsyncThunk<return data type, arg type, rejectValue type>
export const singInAPI = createAsyncThunk<SignInRes, SignInArgs, {rejectValue: string}>(
  'singIn/singInAPI', 
  async function (arg, {rejectWithValue}) {
  
   // axios.post<URL type, response type, config type>
   return await axios.post<string, SignInRes>(URL, arg)
    .then((res) => {
      // Signed up 
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.response.data.message)
    });
});

export default singInAPI