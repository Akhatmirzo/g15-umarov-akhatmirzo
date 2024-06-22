import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import ProductDetail from "./pages/ProductDetail";
import CardDetail from "./pages/CardDetail";
import AddProduct from "./pages/AddProduct";

const App = () => {
  return (
    <>
      <MainLayout>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cardDetail" element={<CardDetail/>}/>
        </Routes>
        
      </MainLayout>
    </>
  );
};

export default App;
