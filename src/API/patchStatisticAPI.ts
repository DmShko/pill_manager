import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { patchStatisticArgs } from '../types/prescriptionTypes';

const URL='https://pill-server.onrender.com/api/statistic/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const patchStatisticAPI = createAsyncThunk<any, patchStatisticArgs, {rejectValue: string}>(
  'patchStatistic/patchStatisticAPI', 
  async function (arg, {rejectWithValue}) {

    const config = {

      headers: {'Authorization':`Bearer ${arg.token}`},
      data: arg.data.prop,

    };   

   // axios.post<URL type, response type, config type>
   return await axios.patch<string, any>(`${URL}?id=${arg.data.id}`, config)
    .then((res) => {
   
      return res;
      // ...
    })
    .catch((error) => {
      
      return rejectWithValue(error.message)
    });
});

export default patchStatisticAPI;