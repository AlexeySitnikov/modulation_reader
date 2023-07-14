import { createSlice } from '@reduxjs/toolkit'
import { initialChecked } from '../../initialState'

export const checkColumnSlice = createSlice({
  name: 'checkColumn',
  initialState: initialChecked.columnChecked,
  reducers: {
    addColumn(state, action) {
      const currentIndex = state.find((element) => element.index === action.payload.index)
      if (!currentIndex) {
        const column = {
          index: action.payload.index,
          name: action.payload.nameOfValue,
        }
        state.push(column)
        state.sort((a, b) => (a.index - b.index))
      }
    },

    removeColumn(state, action) {
      const currentIndex = state.findIndex((element) => element.index === action.payload)
      if (currentIndex !== -1) {
        state.splice(currentIndex, 1)
      }
    },

    removeAllColumns: () => [],
  },
})

export const {
  addColumn, removeColumn, removeAllColumns,
} = checkColumnSlice.actions

export const columnCheckedReducer = checkColumnSlice.reducer
