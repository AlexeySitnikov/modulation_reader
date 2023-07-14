import { createSlice } from '@reduxjs/toolkit'
import { initialChecked } from '../../initialState'

export const checkRowSlice = createSlice({
  name: 'checkRow',
  initialState: initialChecked.rowsChecked,
  reducers: {
    addRow(state, action) {
      state.push(action.payload)
      state.sort((a, b) => (a - b))
    },

    removeRow(state, action) {
      const currentIndex = state.findIndex((index) => index === action.payload)
      if (currentIndex !== -1) {
        state.splice(currentIndex, 1)
      }
    },
  },
})

export const {
  addRow, removeRow,
} = checkRowSlice.actions

export const rowsCheckedReducer = checkRowSlice.reducer
