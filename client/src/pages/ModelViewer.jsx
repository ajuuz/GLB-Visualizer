import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchModelUrl } from '../features/model/modelThunk';
import '@google/model-viewer';
const ModelViewer = () => {
    const {modelId} = useParams();
    const {selectedModelUrl,loading,error}=useSelector(state=>state.models)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchModelUrl(modelId))
    },[modelId,dispatch])

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Loading...</div>
  }

  return (
   <div className="w-full h-screen bg-black flex items-center justify-center">
      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {selectedModelUrl && (
        <model-viewer
          src={selectedModelUrl}
          alt="3D Model"
          auto-rotate
          camera-controls
          ar
           exposure="1.0"
  shadow-intensity="1"
          style={{ width: '80vw', height: '80vh' }}
        />
      )}
    </div>
  )
}

export default ModelViewer
