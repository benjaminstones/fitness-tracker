import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';

import WorkoutsList from "./components/WorkoutsList/WorkoutsList";
import EditWorkout from "./components/editWorkout";
import CreateWorkout from "./components/CreateWorkout/CreateWorkout";
import CreateUser from "./components/createUser";
import CreateExercise from './components/createExercise';
import ViewWorkout from './components/viewWorkout';
import LandingPage from './components/LandingPage/LandingPage'; 
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/"; 

  return (
    <div>
      {showNavBar &&<>
        <NavBar />
        <br/>
      </> } 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/workouts" element={<WorkoutsList />} /> 
        <Route path="/edit/:id" element={<EditWorkout />} />
        <Route path="/create" element={<CreateWorkout />} />
        <Route path="/user" element={<CreateUser />} />
        <Route path="/exercise" element={<CreateExercise />} />
        <Route path="/view/:id" element={<ViewWorkout />} />
      </Routes>
    </div>
  );
}

export default App;