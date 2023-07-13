import { createSlice } from '@reduxjs/toolkit'
import { initialRowChecked } from '../../initialState'

export const checkRowSlice = createSlice({
  name: 'checkRow',
  initialState: initialRowChecked.rowsChecked,
  reducers: {
    addRow(state, action) {
    //   const currentValue = state.find((value) => value.id === action.payload)
    //   if (currentValue) {
    //     currentValue.checked = !currentValue.checked
    //   } else {
    //     const rowsChecked = {
    //       id: action.payload,
    //       checked: true,
    //     }
    // }
      state.push(action.payload)
    },

    removeRow(state, action) {
      const currentIndex = state.findIndex((index) => index === action.payload)
      // console.log(action.payload.name)
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
