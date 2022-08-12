import React from 'react';
import { Form, Input } from 'antd';
import DatePicker from "react-datepicker";
import axios from 'axios';
import AddExerciseModal from './addExerciseModal';
import { useState, useEffect } from "react";

const CreateWorkout = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5001/users').then(res => {
      if (res.data.length > 0) {
        setUsers(res.data.map(user => user.username))
        setUsername(res.data[0].username)
      }
    }).catch((error) => {
      console.log(error);
    })
  }, []);


  const updateUsername = e => setUsername(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updateDuration = e => setDuration(e.target.value);

  const onSubmit = e => {
    const workout = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }
    axios.post('http://localhost:5001/workouts/add', workout).then(res => console.log(res.data))
  }
  return (
    <div>
      <h3>Create New Workout Log</h3>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onSubmit}
      >
        <div className="form-group">
          <label>Username: </label>
          <select type="text"
            required
            className="form-control"
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
        <Form.Item
          label="Description"
          name="discription"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={username}
            onChange={updateDescription}
          />
        </Form.Item>
        <div className="form-group">
          <label>Exercises: </label>
          <AddExerciseModal />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            onChange={updateDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Workout Log" className="btn btn-primary" />
        </div>
      </Form>
    </div>
  )
}

export default CreateWorkout;