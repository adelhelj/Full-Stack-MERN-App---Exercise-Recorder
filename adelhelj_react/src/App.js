import './App.css';
import React, { useState }  from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from "./components/Navigation";
import { GiStrongMan } from 'react-icons/gi'
import { GiWeight } from 'react-icons/gi'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <Router>
        <header>
          
          <h1><GiStrongMan/> Weight-lifting Recorder <GiWeight/></h1> 
          <br />
          <br />
          <br />
          <br />
          <p>Full stack MERN app.</p>
        </header>

        <Navigation />
        <main>
          <Routes className="App-header">
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route> 
            <Route path="/add-exercise" element={<AddExercisePage />}></Route> 
            <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />}></Route> 
          </Routes>
        </main>
          <footer> 
            &copy; 2022 James Adelhelm 
          </footer>
      </Router>
    </div>
  );
}

export default App;
