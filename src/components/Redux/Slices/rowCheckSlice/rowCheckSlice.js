import { createSlice } from '@reduxjs/toolkit'
import { initialChecked } from '../../initialState'

export const checkRowSlice = createSlice({
  name: 'checkRow',
  initialState: initialChecked.rowsChecked,
  reducers: {
    addAllRows(state, action) {
      if (action.payload.length > 0 && state.length === 0) {
        action.payload.forEach((element) => { state.push(element) })
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
      const currentElement = state.find((element) => (
        element.index === action.payload.element.index
      ))
      if (currentElement) {
        currentElement.checked = !action.payload.checked
        state.splice(currentElement.index, 1, currentElement)
      }
    },

    removeRow(state, action) {
      const currentElement = state.find((element) => element.index === action.payload.index)
      if (currentElement) {
        currentElement.checked = !action.payload.checked
        state.splice(currentElement.index, 1, currentElement)
      }
    },
    removeAllRows: () => [],
  },
})

export const {
  addRow, removeRow, removeAllRows, getRows, addAllRows, setCheckedAllRows,
} = checkRowSlice.actions

export const rowsCheckedReducer = checkRowSlice.reducer
