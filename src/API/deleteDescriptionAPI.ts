import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { deleteDescriptionArgs } from '../types/descriptionTypes';

const URL='http://localhost:3000/api/description';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const deleteDescriptionAPI = createAsyncThunk<any,  deleteDescriptionArgs, {rejectValue: string}>(
  'deleteDescription/deleteDescriptionAPI',
  async function (arg, {rejectWithValue}) {
   
    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},
   
    };   

   // axios.post<URL type, response type, config type>
   return await axios.delete<string, any>(`${URL}?id=${arg.id}`, config)
    .then((res) => {
     
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default deleteDescriptionAPI