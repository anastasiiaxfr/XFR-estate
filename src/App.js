import './assets/sass/main.sass';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Properties } from './pages/properties/Properties';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/properties" element={<Properties />}/>
    </Routes>
   </Router>
  );
}

export default App;
