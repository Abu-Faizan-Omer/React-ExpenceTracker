import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],       //  default array
  },
  reducers: {
    setExpenses(state, action) {
      // Action me agar array na ho to fallback empty
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
    addExpense(state, action) {
      state.items.unshift(action.payload);
    },
    updateExpense(state, action) {
      const idx = state.items.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteExpense(state, action) {
      state.items = state.items.filter(e => e.id !== action.payload);
    },
  },
});


export const { setExpenses, addExpense, updateExpense, deleteExpense } = expenseSlice.actions;

// selectors
// expenseSlice.js
export const selectExpenses = state =>
  Array.isArray(state.expenses.items) ? state.expenses.items : [];

export const selectTotalAmount = state => {
  const items = Array.isArray(state.expenses.items) ? state.expenses.items : [];
  const total = items.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  //console.log("Total amount:", total, "Items:", items);
  return total;
};


export const selectIsPremium = state => selectTotalAmount(state) > 1000;

export default expenseSlice.reducer;
