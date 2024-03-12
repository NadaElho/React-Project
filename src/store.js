import { configureStore } from '@reduxjs/toolkit'
import FilterByCategoryReducer from './redux/FilterByCategory'
import CategoriesReducer from './redux/CategoriesSlice'
import productsReducer from './redux/Products'

export const store = configureStore({
  reducer: {
    filterByCategory: FilterByCategoryReducer,
    categories: CategoriesReducer,
    products: productsReducer
  },
})
