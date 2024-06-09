import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { putStatisticArgs } from '../types/prescriptionTypes';

const URL='https://pill-server.onrender.com/api/statistic/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const putStatisticAPI = createAsyncThunk<any, putStatisticArgs, {rejectValue: string}>(
  'putStatistic/putStatisticAPI', 
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

export default putStatisticAPI