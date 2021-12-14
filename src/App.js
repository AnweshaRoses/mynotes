
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  return (
    <>
    <NoteState>
    {/* After the new update you dont need to use exact tag and switch has been changed to Routes */}
    <Router>
    <Navbar/>
      <div className="container">
     <Routes>
          <Route path="/"  element={<Home/>}>
          </Route>
          <Route  path="/about" element={<About/>}>
          </Route>
          <Route  path="/login" element={<Login/>}>
          </Route>
          <Route  path="/Signup" element={<Signup/>}>
          </Route>
        </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
