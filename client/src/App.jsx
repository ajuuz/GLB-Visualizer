
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import SideBar from './components/SideBar';
import ModelViewer from './pages/ModelViewer';
import { Toaster } from 'sonner';
const App = () => {
  return (
    <Router>
      <Toaster position='bottom-center' richColors/>
      <div className='flex'>
        <SideBar/>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/models/:modelId" element={<ModelViewer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App
