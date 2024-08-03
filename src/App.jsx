import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';

import WorkoutsList from "./components/WorkoutsList/WorkoutsList";
import EditWorkout from "./components/EditWorkout/EditWorkout";
import CreateWorkout from "./components/CreateWorkout/CreateWorkout";
import CreateUser from "./components/CreateUser/CreateUser";
import CreateExercise from './components/CreateExercise/CreateExercise';
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
      </Routes>
    </div>
  );
}

export default App;