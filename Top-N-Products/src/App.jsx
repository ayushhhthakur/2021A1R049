import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import WelcomePage from './components/ProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/categories/:categoryname/products/:productid" element={<ProductDetails />} />
          <Route path="/categories/:categoryname/products" element={<ProductList />} />
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
