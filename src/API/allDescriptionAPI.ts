import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { allDescriptionArgs } from '../types/descriptionTypes';

const URL='http://localhost:3000/api/description/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const allDescriptionAPI = createAsyncThunk<any, allDescriptionArgs, {rejectValue: string}>(
  'allDescription/allDescriptionAPI', 
  async function (arg, {rejectWithValue}) {
   
    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},

    };   

   // axios.post<URL type, response type, config type>
   return await axios.get<string, any>(URL, config)
    .then((res) => {
   
      return res.data;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default allDescriptionAPI;