import { createSlice } from "@reduxjs/toolkit";
import { fetchModels, fetchModelUrl, uploadModel } from "./modelThunk";

const initialState={
    models:[],
    selectedModelUrl:null,
    loading:false,
    error:null,
    isSideBarOpen:false
}


const modelSlice=createSlice({
    name:'models',
    initialState,
    reducers:{
        toggleSideBar:(state)=>{
            
            state.isSideBarOpen = !state.isSideBarOpen
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchModels.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchModels.fulfilled,(state,action)=>{
            state.loading = false;
            state.models = action.payload;
        })
        .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
        })
        .addCase(uploadModel.pending, (state) => {
        state.loading = true;
        })
        .addCase(uploadModel.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(uploadModel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Upload failed';
        })
        .addCase(fetchModelUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedModelUrl = action.payload;
        })
        .addCase(fetchModelUrl.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Model load failed';
        })
    }
})

export const { toggleSideBar } = modelSlice.actions; 
export default modelSlice.reducer