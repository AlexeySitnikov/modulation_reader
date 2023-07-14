import { configureStore } from '@reduxjs/toolkit'
import { rowsCheckedReducer } from './Slices/rowChwckSlice/rowCheckSlice'
import { columnCheckedReducer } from './Slices/columnCheckSlice/columnCheckSlice'

export const store = configureStore({
  reducer: {
    rowsChecked: rowsCheckedReducer,
    columnChecked: columnCheckedReducer,
  },
})

// store.subscribe(() => {
//   localStorage.setItem('mod', JSON.stringify(store.getState()))
// })
