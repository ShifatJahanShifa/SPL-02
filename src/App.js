//import logo from './logo.svg';
import './App.css';
import Nav from './component/nav';
import Home from './component/home';
import Tweet from './component/tweet';
import Input from './component/Input';
import Input1 from './component/Input1';
import Output from './component/output';
import Output1 from './component/output1';
import Register from './component/Register';
import GenerateRating from './component/GenerateRating';
import GenerateSolution from './component/GenerateSolution';
import Login from './component/Login';
import Pay from './component/pay1';
import PaymentSuccess from './component/PaymentSuccess';
import Fail from './component/Fail';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweet" element={<Tweet />} />
        <Route path="/Input" element={<Input />} />
        <Route path="/Input1" element={<Input1 />} />
        <Route path="/output" element={<Output />} />
        <Route path="/output1" element={<Output1 />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/GenerateRating" element={<GenerateRating />} />
        <Route path="/GenerateSolution" element={<GenerateSolution />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route path="/Fail" element={<Fail />} />
       </Routes>
        
       </header> 
        
    </div>
    </Router>
  );
}

export default App;
