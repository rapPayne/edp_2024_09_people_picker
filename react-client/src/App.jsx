import { PeoplePicker } from './PeoplePicker'
import { AboutUs, ContactUs, Login } from './Other';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  let trusted = true;
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav>
            <NavLink to="/people-picker">People</NavLink>
            <NavLink to="/aboutus">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/login">Log in</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/people-picker" element={<PeoplePicker />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={trusted ? <ContactUs /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <footer>
          Copyright &copy; {new Date().getFullYear()} EDP Group LLC. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App