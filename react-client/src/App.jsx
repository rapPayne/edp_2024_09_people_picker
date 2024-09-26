import { PeoplePicker } from './PeoplePicker'
import './index.css';
import './App.css';

function App() {

  return (
    <div className="App">
      <header>
        <nav>
          <a href="people-picker.html">People</a>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact Us</a>
        </nav>
      </header>
      <main>
        <PeoplePicker />
      </main>
      <footer>
        Copyright &copy; {new Date().getFullYear()} EDP Group LLC. All rights reserved.
      </footer>
    </div>
  )
}

export default App

const Div = () => <h1></h1>