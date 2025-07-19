import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../features/model/modelSlice";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { isSideBarOpen } = useSelector((state) => state.models);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div className="relative h-screen">
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`absolute top-4 ${isSideBarOpen?'right-2':'-right-10'}  z-50`}>
          <Menu
            className={`w-6 h-6 ${isSideBarOpen?'text-black bg-white':'text-white bg-gray-900'} p-1 rounded shadow cursor-pointer`}
            onClick={() => dispatch(toggleSideBar())}
          />
        </div>

        <div className="p-6 text-2xl font-semibold border-b border-gray-700">
          Menu
        </div>
        <div className="p-4 flex flex-col gap-4">
          <button onClick={()=>{navigate('/dashboard');dispatch(toggleSideBar())}} className="w-full text-left px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">
            Dashboard
          </button>
          <button onClick={()=>{navigate('/upload');dispatch(toggleSideBar())}}   className="w-full text-left px-4 py-2 bg-gray-800 rounded hover:bg-gray-700">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
