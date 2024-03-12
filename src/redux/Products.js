import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = []
export const getProducts = createAsyncThunk("products/getProducts", async()=>{
    const {data} = await axios.get("http://localhost:3000/products")
    return data
})
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getProducts.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})

export default productsSlice.reducer