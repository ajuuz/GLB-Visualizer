import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchModels } from '../features/model/modelThunk';
import GlbCard from '../components/GlbCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { models, error, loading } = useSelector((state) => state.models);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  if(loading){
    return <div className='w-full h-screen flex justify-center items-center'>Loading ...</div>
  }
  return (
    <div className='min-h-screen w-full bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Dashboard</h1>

      {loading && <p className='text-blue-500 '>Loading models...</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}

      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        {models.map((model) => (
          <GlbCard model={model}/>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
