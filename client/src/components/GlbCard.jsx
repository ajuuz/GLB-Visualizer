import { useNavigate } from "react-router-dom"

const GlbCard = ({model}) => {
    const navigate = useNavigate()
  return (
     <div onClick={()=>navigate(`/models/${model._id}`)} key={model._id} className='bg-white shadow-md rounded-2xl p-4 border border-gray-200'>
        <div className=''>
          <h2 className='text-lg font-semibold text-gray-800'>
            {model.name}
          </h2>
          <p className='text-sm text-gray-500'>
            Uploaded: {new Date(model.createdAt).toLocaleString()}
          </p>
        </div>
    </div>
  )
}

export default GlbCard
