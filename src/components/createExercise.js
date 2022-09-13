import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const CreateExercise = () => {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [musclegroup, setMusclegroup] = useState('');
    const [notes, setNotes] = useState('');

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
        axios.post('http://localhost:5001/exercises/add', exercise).then(res => console.log(res.data))
        return false;
    }

    return (
        <>
            <h3>Create New Exercise</h3>
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default CreateExercise;