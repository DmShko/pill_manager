import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { getCoursesArgs } from '../types/prescriptionTypes';


const URL='https://pill-server.onrender.com/api/pills';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const getCoursesAPI = createAsyncThunk<any, getCoursesArgs, {rejectValue: string}>(
  'getCourses/getCoursesAPI', 
  async function (arg, {rejectWithValue}) {
   
    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},
   
    };   

   // axios.post<URL type, response type, config type>
   return await axios.get<string, any>(URL, config)
    .then((res) => {
      
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default getCoursesAPI