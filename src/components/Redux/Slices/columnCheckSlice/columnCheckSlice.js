import { createSlice } from '@reduxjs/toolkit'
import { initialChecked } from '../../initialState'

export const checkColumnSlice = createSlice({
  name: 'checkColumn',
  initialState: initialChecked.columnChecked,
  reducers: {
    addColumn(state, action) {
      const column = {
        index: action.payload.index,
        name: action.payload.nameOfValue,
      }
      state.push(column)
      state.sort((a, b) => (a.index - b.index))
    },

    removeColumn(state, action) {
      const currentIndex = state.findIndex((element) => element.index === action.payload)
      if (currentIndex !== -1) {
        state.splice(currentIndex, 1)
      }
    },
  },
})

export const {
  addColumn, removeColumn,
} = checkColumnSlice.actions

export const columnCheckedReducer = checkColumnSlice.reducer
