import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// types
import { deleteStatisticArgs } from '../types/prescriptionTypes';

const URL='http://localhost:3000/api/statistic/';

// createAsyncThunk<return data type, arg type, rejectValue type>
export const deleteStatisticAPI = createAsyncThunk<any, deleteStatisticArgs, {rejectValue: string}>(
  'deleteStatistic/deleteStatisticAPI', 
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

export default deleteStatisticAPI;