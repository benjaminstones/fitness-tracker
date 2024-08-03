import React, { useState, useRef } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import '../ContainerStyles.css';


const CreateExercise = () => {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [musclegroup, setMusclegroup] = useState('');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const isLoading = useRef(false);


    const updateName = e => setName(e.target.value);
    const updateMusclegroup = e => setMusclegroup(e.target.value);
    const updateNotes = e => setNotes(e.target.value);


    const onSubmit = e => {
        const exercise = {
            name: name,
            musclegroup: musclegroup,
            notes: notes
        }
        form.resetFields();
        setSubmitted(true);
        axios.post('http://localhost:5001/exercises/add', exercise)
            .then(res => {
                isLoading.current = true;
            }).catch((error) => {
                console.log(error);
            });
        return false;
    }

    return (
        <div className='container'>
            <h1>Create New Exercise</h1>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onSubmit}
                layout='vertical'
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input an exercise name!',
                        },
                    ]}
                >
                    <Input
                        value={name}
                        onChange={updateName}
                    />
                </Form.Item>
                <Form.Item
                    label="Musclegroup"
                    name="musclegroup"
                    rules={[
                        {
                            required: true,
                            message: 'Please input a muscle group!',
                        },
                    ]}
                >
                    <Input
                        value={musclegroup}
                        onChange={updateMusclegroup}
                    />
                </Form.Item>
                <Form.Item
                    label="Notes"
                    name="notes"
                >
                    <Input
                        value={notes}
                        onChange={updateNotes}
                    />
                </Form.Item>
                {submitted && <Alert message="Exercise added" type="success" showIcon />}
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateExercise;