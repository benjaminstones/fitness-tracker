import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import { useParams } from "react-router-dom";

const EditWorkout = (props) => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([])
    let { id } = useParams();


    useEffect(() => {
        axios.get('http://localhost:5001/workouts/' + id)
            .then(response => {

                setUsername(response.data.username)
                setDescription(response.data.description)
                setDuration(response.data.duration)
                setDate(response.data.date)
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5001/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => user.username))
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, [])


    const updateUsername = e => setUsername(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updateDuration = e => setDuration(e.target.value);
    const updateDate = date => setDate(date);

    const onSubmit = e => {
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        console.log(exercise)
        axios.post('http://localhost:5001/workouts/update/' + id, exercise)
            .then(res => console.log(res.data));
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={updateUsername}
                    >
                        {
                            users.map((user) => {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={updateDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={updateDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={updateDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditWorkout;