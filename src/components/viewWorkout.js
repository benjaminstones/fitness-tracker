import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';



const ViewWorkout = (props) => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [exercises, setExercises] = useState([])
    let { id } = useParams();


    useEffect(() => {
        axios.get('http://localhost:5001/workouts/' + id)
            .then(response => {
                console.log(response.data.username)

                setUsername(response.data.username)
                setDescription(response.data.description)
                setDuration(response.data.duration)
                setDate(response.data.date)
                setExercises(response.data.exercises)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <>
            <h3>View Workout</h3>
            <h1>{username}</h1>
            <h1>{description}</h1>
        </>
    )
}

export default ViewWorkout;