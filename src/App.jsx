import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import NavBar from './components/navbar';
import WorkoutsList from "./components/workoutsList";
import EditWorkout from "./components/editWorkout";
import CreateWorkout from "./components/createWorkout";
import CreateUser from "./components/createUser";
import CreateExercise from './components/createExercise';

function App() {
  return (
    <div className="container">
      <NavBar />
      <br />
      <Routes>
        <Route path="/" exact element={<WorkoutsList />} />
        <Route path="/edit/:id" element={<EditWorkout />} />
        <Route path="/create" element={<CreateWorkout />} />
        <Route path="/user" element={<CreateUser />} />
        <Route path="/exercise" element={<CreateExercise />} />
      </Routes>
    </div>
  );
}

export default App;