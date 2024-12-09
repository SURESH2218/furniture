import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/home'
import Shop from './pages/shop'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/shop" element={<Shop />}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
