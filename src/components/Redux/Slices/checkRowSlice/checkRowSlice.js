import { createSlice } from '@reduxjs/toolkit'
import { initialRowChecked } from '../../initialState'

export const checkRowSlice = createSlice({
  name: 'checkRow',
  initialState: initialRowChecked.rowsChecked,
  reducers: {
    addRow(state, action) {
      const currentValue = state.find((value) => value.id === action.payload)
      if (currentValue) {
        currentValue.checked = !currentValue.checked
      } else {
        const rowsChecked = {
          id: action.payload,
          checked: true,
        }
        state.push(rowsChecked)
      }
    },
    removeRow(state, action) {
      const currentValue = state.find((value) => value.index === action.payload.index)
      if (currentValue) {
        currentValue.checked = false
      }
    },
  },
})

export const {
  addRow, removeRow,
} = checkRowSlice.actions

export const rowsCheckedReducer = checkRowSlice.reducer
