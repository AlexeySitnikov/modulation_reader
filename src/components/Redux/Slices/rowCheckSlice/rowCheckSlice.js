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
          checked: true,
        }
        state.splice(index, 1, element)
      })
    },

    setUncheckedAllRows(state, action) {
      action.payload.forEach((el, index) => {
        const element = {
          ...el,
          checked: false,
        }
        state.splice(index, 1, element)
      })
    },

    deleteCheckedRows(state, action) {
      action.payload.forEach((el) => {
        if (el.checked) {
          const currentElement = state.find((element) => (element.id === el.id))
          if (currentElement) {
            const currentIndex = state.indexOf(currentElement)
            state.splice(currentIndex, 1)
          }
        }
      })
    },

    addRow(state, action) {
      const currentElement = state.find((element) => (
        element.id === action.payload.id
      ))
      if (currentElement) {
        currentElement.checked = !action.payload.checked
        const currentIndex = state.indexOf(currentElement)
        state.splice(currentIndex, 1, currentElement)
      }
    },

    removeRow(state, action) {
      const currentElement = state.find((element) => (
        element.id === action.payload.id
      ))
      if (currentElement) {
        currentElement.checked = !action.payload.checked
        const currentIndex = state.indexOf(currentElement)
        state.splice(currentIndex, 1, currentElement)
      }
    },
    removeAllRows: () => [],
  },
})

export const {
  addRow, removeRow, removeAllRows, addAllRows, setCheckedAllRows, setUncheckedAllRows,
  deleteCheckedRows,
} = checkRowSlice.actions

export const rowsCheckedReducer = checkRowSlice.reducer
