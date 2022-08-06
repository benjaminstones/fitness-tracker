import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

const ExercisesList = () => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5001/exercises/')
            .then(res => {
                setExercises(res.data)
                console.log(exercises);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5001/exercises/' + id)
            .then(response => { console.log(response.data) });
        setExercises(exercises.filter(el => el._id !== id))
    }

    return (
        <>
            <h3>Logged Exercises</h3>
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
                    {exercises.map(exercise => (
                        <tr key={exercise._id} >
                            <td>{exercise.username}</td>
                            <td>{exercise.description}</td>
                            <td>{exercise.duration}</td>
                            <td>{exercise.date.substring(0, 10)}</td>
                            <td>
                                <Link to={"/edit/" + exercise._id}>edit</Link> | <a href="#" onClick={() => { deleteExercise(exercise._id) }}>delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ExercisesList;