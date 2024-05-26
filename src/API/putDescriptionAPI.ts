import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { putDescriptionArgs } from '../types/descriptionTypes';

const URL='http://localhost:3000/api/description/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const putDescriptionAPI = createAsyncThunk<any, putDescriptionArgs, {rejectValue: string}>(
  'putDescription/putDescriptionAPI', 
  async function (arg, {rejectWithValue}) {
   
    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},
      data: arg.data,

    };   

   // axios.post<URL type, response type, config type>
   return await axios.put<string, any>(`${URL}?id=${arg.id}`, config)
    .then((res) => {
      
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default putDescriptionAPI;