import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { UserPage } from './project1/page';
import { SignUp } from './project1/signup';
import { LoginUser } from './project1/login';
import { Categories } from './project1/category';
import { Product } from './project1/product';
import { CartPage } from './project1/cart';
import { OrderItem } from './project1/order';
//import { RedirectFunction } from 'react-router-dom';
function App() {
  return (
   // <SignUp/>
  
   <>
   <div className='App'>
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<UserPage/>}/>
          <Route path='/page' element={<UserPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LoginUser/>}/>
          <Route path='/category' element={<Categories/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/order' element={<OrderItem/>}/>
        </Route>
      </Routes>
    </Router>
    </div>
   </>

  );
}
export default App;