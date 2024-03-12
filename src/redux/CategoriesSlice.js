import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []
export const getCategories = createAsyncThunk("categories/selectCategory", async()=>{
    const {data} = await axios.get("http://localhost:3000/categories")
    return data
})
export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getCategories.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})

export default categoriesSlice.reducer