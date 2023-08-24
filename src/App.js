import './App.css';
 
import FormChoice from './components/FormChoice';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import HostRegister from './components/HostRegister';
import Log from './components/Log';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import HostPage from './components/HostPage';
import TravellerPage from './components/TravellerPage';
 
  

function App() {
  return (
    <div className="App">

    <header>
      <Routes>
          <Route path='' element={<Home/>}></Route>
          <Route path='/login' element={<Log/>}></Route> 
          <Route path='/choice' element={<FormChoice/>}></Route>
          <Route path='/reg' element={<Register/>}></Route>
          <Route path='/host' element={<HostRegister/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/adminPage' element={<AdminPage/>}></Route>
          <Route path='/hostPage' element={<HostPage/>}></Route>
          <Route path='/travellerPage' element={<TravellerPage/>}></Route>
      </Routes>
      </header>
      
      {/* <div>
      <Slide></Slide>
      </div> */}
      
    </div>
  );
}

export default App;
