import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoice: {
    company: '',
    client: '',
    number: '',
    date: '',
    items: []
  }
};

/*
  A function:(initial state, an object of reducer functions, a "slice name")
  generates-> action creators and action types that correspond to the reducers and state.
*/
const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateInvoice(state, action) {
      state.invoice = action.payload; 
      }
    },
});

export const { updateInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
