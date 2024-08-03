import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, DatePicker, Select, Button, Table } from 'antd';
import moment from 'moment';
import AddExerciseModal from '../AddExerciseModal/AddExerciseModal';
import '../ContainerStyles.css';

const { Option } = Select;
const { RangePicker } = DatePicker;

const EditWorkout = () => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const history = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseWorkout = await axios.get(`http://localhost:5001/workouts/${id}`);
                console.log(responseWorkout.data)
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
                console.log(error);
            }
        };
        fetchData();
    }, [id, form]);

    const onSubmit = (values) => {
        const exercise = {
            username: values.username,
            description: values.description,
            startDate: values.date[0], 
            endDate: values.date[1],
            exercises: workoutExercises,
        };

        console.log(exercise)
        axios.post(`http://localhost:5001/workouts/update/${id}`, exercise)
            .then(res => {
                console.log(res.data);
                history.push('/'); 
            });
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

    const handleExerciseClick = (exercise) => {
        setWorkoutExercises([...workoutExercises, exercise]);
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
                    date: [moment(), moment()], // Default to current date range, but will be overridden by useEffect
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
                    <AddExerciseModal clickHandler={handleExerciseClick} />
                </div>
                <Table columns={columns} dataSource={workoutExercises} pagination={{ pageSize: 5 }} className='exercises-table' />
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
