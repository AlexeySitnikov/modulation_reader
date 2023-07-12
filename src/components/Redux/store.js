import { configureStore } from '@reduxjs/toolkit'
import { rowsCheckedReducer } from './Slices/checkRowSlice/checkRowSlice'

export const store = configureStore({
  reducer: {
    rowsChecked: rowsCheckedReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem('mod', JSON.stringify(store.getState()))
})
