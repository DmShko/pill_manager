import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { addDescriptionArgs } from '../types/descriptionTypes';

const URL='http://localhost:3000/api/description';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const addDescriptionAPI = createAsyncThunk<any, addDescriptionArgs, {rejectValue: string}>(
  'addDescription/addDescriptionAPI', 
  async function (arg, {rejectWithValue}) {

    const options = {

      headers: {'Authorization':`Bearer ${arg.token}`},
      data: arg.data,

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

export default addDescriptionAPI