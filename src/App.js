import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { UserPage } from './project1/page';
import { SignUp } from './project1/signup';
import { LoginUser } from './project1/login';
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
        </Route>
      </Routes>
    </Router>
    </div>
   </>

  );
}
export default App;