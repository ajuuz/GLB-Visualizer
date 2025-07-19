import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchModels = createAsyncThunk('models/fetchAll',async()=>{
    const response = await axios.get(`${BASE_URL}/models`)
    return response.data; 
})


export const uploadModel = createAsyncThunk('models/upload',async({name,file})=>{
    const formData = new FormData();
    formData.append('name',name)
    formData.append('model',file);
    await axios.post(`${BASE_URL}/models`,formData)
})


export const fetchModelUrl = createAsyncThunk(
    'models/fetchById',
    async(id)=>{
        const response = await axios.get(`${BASE_URL}/models/${id}`,{
            responseType:'blob'
        });
        const blobURL =  URL.createObjectURL(response.data)
        return blobURL;
    }
)