import { Navigate, Routes, Route } from 'react-router-dom';
import ProductPage from '../pages/ProductPage';
import Home from '../pages/Home';
import Sidebar from './Sidebar';
import '../styles/app.scss';

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<ProductPage />} />
        <Route  path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
}

export default App;
