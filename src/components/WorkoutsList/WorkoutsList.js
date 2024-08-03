import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import './WorkoutsList.css';
import '../ContainerStyles.css';


const WorkoutsList = () => {
    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5001/workouts/')
            .then(res => {
                console.log(res.data)
                setWorkouts(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5001/workouts/' + id)
            .then(response => { 
                console.log(response.data) 
            })
            .catch((error) => {
                console.log(error);
            });
        setWorkouts(workouts.filter(el => el._id !== id))
    }

    return (
        <div className='container'>
            <h1>Logged Exercises</h1>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map(exercise => (
                        <tr key={exercise._id} >
                            <td>{exercise.username}</td>
                            <td>{exercise.description}</td>
                            <td>{exercise.duration}</td>
                            <td>{exercise.startDate.substring(0, 10)}</td>
                            <td>
                                <Link to={"/edit/" + exercise._id}>View and Edit</Link> | <a href="#" onClick={() => { deleteExercise(exercise._id) }}>Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ div>
    )
}

export default WorkoutsList;