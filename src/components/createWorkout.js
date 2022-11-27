import React from 'react';
import { Form, Input, Button, DatePicker, Select, Alert } from 'antd';
import axios from 'axios';
import AddExerciseModal from './addExerciseModal';
import { useState, useEffect, createContext } from "react";

export const ExercisesContext = createContext();

const CreateWorkout = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([])
  const [exercises, setExercises] = useState([])
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [submitted, setSubmitted] = useState(false);


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

  useEffect(() => {
    axios.get('http://localhost:5001/exercises/').then(res => {
      if (res.data.length > 0) {
        setExercises(res.data.map(exercise => exercise.name))
      }
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const handleClick = (exercise => {
    setWorkoutExercises([...workoutExercises, exercise])
  })


  const updateUsername = e => setUsername(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updateDuration = e => setDuration(e.target.value);
  const { Option } = Select;

  const onSubmit = e => {
    const workout = {
      username: username,
      description: description,
      duration: duration,
      date: date,
      exercises: workoutExercises,
    }
    axios.post('http://localhost:5001/workouts/add', workout).then(res => console.log(res.data))
    setSubmitted(true)
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
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select onChange={updateUsername}>
            {
              users.map((user) => {
                return <Option
                  key={user}
                  value={user}>{user}
                </Option>;
              })
            }

          </Select>
        </Form.Item>
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
            value={description}
            onChange={updateDescription}
          />
        </Form.Item>
        <Form.Item
          label="Duration"
          name="duration"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={duration}
            onChange={updateDuration}
          />
        </Form.Item>
        <Form.Item>
          <label>Exercises: </label>
          <ExercisesContext.Provider value={exercises}>
            <AddExerciseModal clickHandler={handleClick} />
          </ExercisesContext.Provider>
        </Form.Item>
        <table>
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Reps</th>
              <th>Sets</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {workoutExercises.map(exercise => (
              <tr key={exercise.name} >
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.sets}</td>
                <td>{exercise.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Form.Item>
          <label>Date: </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </Form.Item>
        {submitted && <Alert message="Workout added" type="success" showIcon />}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateWorkout;