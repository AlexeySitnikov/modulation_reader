import { configureStore } from '@reduxjs/toolkit'
import { rowsCheckedReducer } from './Slices/rowCheckSlice/rowCheckSlice'
import { columnCheckedReducer } from './Slices/columnCheckSlice/columnCheckSlice'

export const store = configureStore({
  reducer: {
    rows: rowsCheckedReducer,
    // rowsChecked: rowsCheckedReducer,
    columnChecked: columnCheckedReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem('mod', JSON.stringify(store.getState()))
})
