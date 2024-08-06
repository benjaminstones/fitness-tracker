import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';
import AddExerciseModal from '../AddExerciseModal/AddExerciseModal';
import '../ContainerStyles.css';
import { ExercisesTable } from '../ExercisesTable';

const { Option } = Select;
const { RangePicker } = DatePicker;

const EditWorkout = () => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseWorkout = await axios.get(`http://localhost:5001/workouts/${id}`);
                const workoutData = responseWorkout.data;
                const responseUsers = await axios.get('http://localhost:5001/users/');
                const usersData = responseUsers.data;

                if (usersData.length > 0) {
                    setUsers(usersData.map(user => user.username));
                }

                setWorkoutExercises(workoutData.exercises || []);
                form.setFieldsValue({
                    username: workoutData.username,
                    description: workoutData.description,
                    duration: workoutData.duration,
                    date: [moment(workoutData.startDate), moment(workoutData.endDate)], 
                });
            } catch (error) {
                console.error('Error fetching workout data:', error);
            }
        };
        fetchData();
    }, [id, form]);

    const onSubmit = (values) => {
        const workout = {
            username: values.username,
            description: values.description,
            startDate: values.date[0].toISOString(), 
            endDate: values.date[1].toISOString(),
            exercises: workoutExercises,
        };

        axios.post(`http://localhost:5001/workouts/update/${id}`, workout)
            .then(res => {
                navigate('/workouts');
            })
            .catch(err => {
                console.error('Error updating workout:', err);
            });
    };

    const handleExerciseClick = (exercise) => {
        const updatedExercises = workoutExercises.map(workoutExercise => {
            if (workoutExercise._id === exercise.id) {
                return {
                    ...workoutExercise,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    weight: exercise.weight,
                    name: exercise.name
                };
            }
            return workoutExercise;
        });
    
        setWorkoutExercises(updatedExercises);
    };
    
    const handleEditExercise = (exercise) => {
        console.log("Exercise to Edit:", exercise);
        setSelectedExercise(exercise);
    };

    return (
        <div className='container'>
            <h1>Edit Workout</h1>
            <Form
                form={form}
                name="edit_workout"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onSubmit}
                layout='vertical'
                initialValues={{
                    date: [moment(), moment()], 
                }}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please select a username!' }]}
                >
                    <Select>
                        {users.map(user => (
                            <Option key={user} value={user}>{user}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Date Range"
                    name="date"
                    rules={[{ required: true, message: 'Please select a date range!' }]}
                >
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                    />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input />
                </Form.Item>
                <div className="exercises-container">
                    <label className='exercises-label'>Exercises: </label>
                    <AddExerciseModal clickHandler={handleExerciseClick} exercise={selectedExercise} />
                </div>
                <ExercisesTable exercises={workoutExercises} handleEditExercise={handleEditExercise} />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Save Exercise Log
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditWorkout;
