import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import { uploadModel } from '../features/model/modelThunk';
import { toast } from 'sonner';

const schema = yup.object().shape({
    name: yup.string().required('Model name is required'),
    file: yup.mixed().required('A .glb file is required')
    .test('fileFormat', 'Only .glb files are accepted', (value) => {
        console.log(value)
        return value && value.name.endsWith('.glb');
    })
    .test('fileSize', 'File size must be less than 100MB', (value) => value?.size <= 100 * 1024 * 1024),
});

const Upload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging,setIsDragging] = useState(false)
    const dispatch = useDispatch();

    const {
        handleSubmit,
        reset,
        control,
        setValue,
        formState:{errors}
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleDragEnter=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true);
    }
    const handleDragOver=(e)=>{
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragLeave=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false);
    }
    const handleDrop=(e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            setValue('file',droppedFile,{shouldValidate:true})
        }
        e.dataTransfer.clearData()
    }

   

    const removeFile = () => {
        setValue('file',null)
    };

    const onSubmit = async (data) => {
        try{
            await dispatch(uploadModel(data)).unwrap()
            toast.success("Model uploaded successfully")
        }catch(error){
            toast.error("Failed to upload model")
        }
        
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">GLB Model Uploader</h1>
                    <p className="text-gray-400 mt-2">Upload your 3D models with ease</p>
                </div>

                <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl space-y-8 border border-gray-700">
                    <div>
                        <label htmlFor="file-name" className="block text-lg font-semibold text-gray-300 mb-2">Model Name</label>

                        <Controller name='name' control={control} render={({field})=>(
                            <input
                            type="text"
                            {...field}
                            placeholder="e.g., 'My Awesome Spaceship'"
                            className="w-full bg-gray-700 border-2 border-gray-600 text-white rounded-lg p-4 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ease-in-out"
                            disabled={isUploading}
                            />
                        )}/>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-300 mb-2">.glb File</label>

                        <Controller name='file' control={control} render={({field})=>(
                            <div className="mt-2">
                            <input
                                type="file"
                                id="glb-file-input"
                                accept=".glb"
                                className="hidden"
                                onChange={(e)=>field.onChange(e.target.files[0])}
                                disabled={isUploading}
                            />
                            <div className="flex items-center gap-4">
                                <label onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} htmlFor="glb-file-input" className={`${isDragging ?'border-5':'border-2'} w-full flex-1 text-center px-6 py-4 rounded-lg transition-all duration-300 border-2 `}>
                                    {
                                    isDragging
                                    ?'INSERT HERE!!'
                                    :field.value
                                    ?field.value.name
                                    :'Click to select a .glb file or drag a .glb file'}
                                </label>
                                {field.value &&(
                                    <button type="button" onClick={removeFile} className="p-2 text-gray-400 hover:text-white bg-gray-700 rounded-full transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        )}/>
                    </div>

                    <div>
                        {errors.file && <p>{errors.file.message}</p>}
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <button type="submit" disabled={isUploading} className="w-full flex justify-center items-center bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                        {isUploading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </>
                        ) : 'Upload Model'}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Upload