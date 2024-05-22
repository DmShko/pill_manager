import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { patchCoursesArgs } from '../types/prescriptionTypes';


const URL='http://localhost:3000/api/pills/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const patchCourseAPI = createAsyncThunk<any, patchCoursesArgs, {rejectValue: string}>(
  'patchCourses/patchCoursesAPI', 
  async function (arg, {rejectWithValue}) {
  
    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},
      data: {prop: arg.prop, key: arg.key},

    };   

   // axios.post<URL type, response type, config type>
   return await axios.patch<string, any>(`${URL}?id=${arg.id}`, config)
    .then((res) => {
      
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default patchCourseAPI