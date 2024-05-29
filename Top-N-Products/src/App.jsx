import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import WelcomePage from './components/ProductPage';


function App() {
  return (
    <div>
       <Routes>
       <Route path="/categories/:categoryname/products/:productid" element={<ProductDetails />} />
          <Route path="/categories/:categoryname/products" element={<ProductList />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
    </div>
  );
}

export default App;
