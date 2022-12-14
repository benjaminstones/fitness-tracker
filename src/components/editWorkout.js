import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Form, Input, DatePicker, Select } from 'antd';

const { Option } = Select;


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
        axios.post('http://localhost:5001/workouts/update/' + id, exercise)
            .then(res => console.log(res.data));
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
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
                    <label>Date: </label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => updateDate(date)}
                    />
                </Form.Item>
                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </Form>
        </div>
    )
}

export default EditWorkout;