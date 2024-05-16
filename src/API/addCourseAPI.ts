import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { addCourseArgs } from '../types/prescriptionTypes';

const URL='http://localhost:3000/api/pills';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const addCourseAPI = createAsyncThunk<any, addCourseArgs, {rejectValue: string}>(
  'addCourse/addCourseAPI', 
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

export default addCourseAPI