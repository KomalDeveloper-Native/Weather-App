import {createSlice} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
const initialState = {
  counter: 0,

};

const authRedux = createSlice({
  name: 'List',
  initialState,
  reducers: {
    inCreament: ( state) => {
      state.counter += 1;
    },
  },
});

export const {inCreament} = authRedux.actions
export default authRedux.reducer


