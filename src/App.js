
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
    {/* After the new update you dont need to use exact tag and switch has been changed to Routes */}
    <Router>
    <Navbar/>
     <Routes>
          <Route path="/"  element={<Home/>}>
          </Route>
          <Route  path="/about" element={<About/>}>
          </Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
