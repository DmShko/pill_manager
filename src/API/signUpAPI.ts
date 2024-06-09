import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { SignUpArgs } from '../types/authTypes'
import { SignUpRes } from '../types/authTypes'

const URL = 'https://pill-server.onrender.com/api/auth/signup';
// createAsyncThunk<return data type, arg type, rejectValue type>
export const singUpAPI = createAsyncThunk<SignUpRes, SignUpArgs, {rejectValue: string}>(
  'singUp/singUpAPI', 
  async function (arg, {rejectWithValue}) {
  
   // axios.post<URL type, response type, config type>
   return await axios.post<string, SignUpRes>(URL, arg)
    .then((res) => {
      // Signed up 
      return res;
      // ...
    })
    .catch((error) => {
      return rejectWithValue(error.response.data.message)
    });
});

export default singUpAPI