import './App.css';
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Submit from './components/Submit';
import Home from './components/Home';
import Error from './components/Error';

function App() {
  return (
    <div className='app' >
      <Router>
        <Routes>
        <Route path="/" element = {<Submit/> } />
        <Route path='home' element={<Home/>}/>
        <Route path='*' element={<Error/>}/>
       </Routes>
      </Router>
     
    </div>
  );
}

export default App;
