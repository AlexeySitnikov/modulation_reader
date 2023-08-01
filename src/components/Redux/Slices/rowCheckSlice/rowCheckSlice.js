import { createSlice } from '@reduxjs/toolkit'
import { initialChecked } from '../../initialState'

export const checkRowSlice = createSlice({
  name: 'checkRow',
  initialState: initialChecked.rowsChecked,
  reducers: {
    addAllRows(state, action) {
      if (action.payload.length > 0) {
        state.push(action.payload)
      }
    },

    setCheckedAllRows(state, action) {
      action.payload.forEach((el, index) => {
        const element = {
          ...el,
          checked: !el.checked,
        }
        state.splice(index, 1, { element, index })
      })
    },

    addRow(state, action) {
      const currentIndex = state.find((element) => (
        element.index === action.payload.index
      ))
      if (currentIndex) {
        const element = {
          ...currentIndex.element,
          checked: !action.payload.checked,
        }
        const { index } = currentIndex
        state.splice(currentIndex.index, 1, { element, index })
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
  addRow, removeRow, removeAllRows, getRows, addAllRows, setCheckedAllRows,
} = checkRowSlice.actions

export const rowsCheckedReducer = checkRowSlice.reducer
