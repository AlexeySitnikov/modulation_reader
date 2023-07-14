import { createSlice } from '@reduxjs/toolkit'
import { initialChecked } from '../../initialState'

export const checkRowSlice = createSlice({
  name: 'checkRow',
  initialState: initialChecked.rowsChecked,
  reducers: {
    addRow(state, action) {
      const currentIndex = state.find((element) => element.index === action.payload.index)
      if (!currentIndex) {
        console.log({ action })
        state.push(action.payload)
        state.sort((a, b) => (a - b))
      }
    },

    removeRow(state, action) {
      const currentIndex = state.findIndex((element) => element.index === action.payload)
      if (currentIndex !== -1) {
        state.splice(currentIndex, 1)
      }
    },
    removeAllRows: () => [],
  },
})

export const {
  addRow, removeRow, removeAllRows,
} = checkRowSlice.actions

export const rowsCheckedReducer = checkRowSlice.reducer
