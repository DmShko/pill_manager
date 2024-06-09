import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { deleteArgs } from '../types/prescriptionTypes';

const URL='https://pill-server.onrender.com/api/pills';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const deleteCourseAPI = createAsyncThunk<any, deleteArgs, {rejectValue: string}>(
  'deleteCourse/deleteCourseAPI', 
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

export default deleteCourseAPI