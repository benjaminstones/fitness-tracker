import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Alert, Table } from 'antd';
import axios from 'axios';
import AddExerciseModal from '../AddExerciseModal/AddExerciseModal';
import './CreateWorkout.css';
import '../ContainerStyles.css';
import timediff from 'timediff';

const { RangePicker } = DatePicker;

const CreateWorkout = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [users, setUsers] = useState([]);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/users')
      .then((res) => {
        if (res.data.length > 0) {
          const usernames = res.data.map((user) => user.username);
          setUsers(usernames);
          setUsername(usernames[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleExerciseClick = (exercise) => {
    setWorkoutExercises([...workoutExercises, exercise]);
  };

  const updateUsername = (value) => setUsername(value);

  const formatDuration = (minutes) => `${minutes} Minutes`;

  const onDurationChange = (dates) => {
    setDates(dates);
    if (dates) {
      const diff = timediff(
        dates[0].format('YYYY-MM-DD HH:mm'),
        dates[1].format('YYYY-MM-DD HH:mm'),
        'm'
      ).minutes;
      setDuration(diff);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sets',
      dataIndex: 'sets',
      key: 'sets',
    },
    {
      title: 'Reps',
      dataIndex: 'reps',
      key: 'reps',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
  ];

  const handleSubmit = (e) => {
    const formattedDuration = formatDuration(duration);
    const workout = {
      username,
      description,
      duration: formattedDuration,
      startDate: dates[0],
      endDate: dates[1],
      exercises: workoutExercises,
    };
    axios.post('http://localhost:5001/workouts/add', workout)
      .then((res) => console.log(res.data));
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h1>Create New Workout Log</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true }]}
          className="username-input"
        >
          <Select onChange={updateUsername}>
            {users.map((user) => (
              <Select.Option key={user} value={user}>
                {user}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Duration"
          name="duration"
          rules={[{ required: true }]}
          className="duration-input"
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onDurationChange}
            onOk={onDurationChange}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
          className="description-input"
        >
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <div className="exercises-container">
          <label className='exercises-label'>Exercises: </label>
          <AddExerciseModal clickHandler={handleExerciseClick} />
        </div>
        <Table columns={columns} dataSource={workoutExercises} pagination={{ pageSize: 5 }} className='exercises-table' />
        {submitted && <Alert message="Workout added" type="success" showIcon />}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className='submit-button'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateWorkout;
