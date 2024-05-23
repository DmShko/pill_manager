import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { allStatisticArgs } from '../types/prescriptionTypes';

const URL='http://localhost:3000/api/statistic/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const allStatisticAPI = createAsyncThunk<any, allStatisticArgs, {rejectValue: string}>(
  'allStatistic/allStatisticAPI', 
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

export default allStatisticAPI;