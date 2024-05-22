import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { addStatisticArgs } from '../types/prescriptionTypes';

const URL='http://localhost:3000/api/statistic/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const addStatisticAPI = createAsyncThunk<any, addStatisticArgs, {rejectValue: string}>(
  'addStatistic/addStatisticAPI', 
  async function (arg, {rejectWithValue}) {
    
    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},
      data: arg.data,

    };   

   // axios.post<URL type, response type, config type>
   return await axios.post<string, any>(URL, config)
    .then((res) => {
     
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default addStatisticAPI;