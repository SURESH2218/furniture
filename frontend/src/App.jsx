import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Shop from './pages/shop';
import Authentication from './auth/Authentication';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/auth' element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
