import { createSlice } from '@reduxjs/toolkit'

const initialState = 0

export const filterByCategorySlice = createSlice({
  name: 'filterByCategory',
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      return action.payload.id || 0
    },
  },
})

export const { filterByCategory } = filterByCategorySlice.actions
export default filterByCategorySlice.reducer
