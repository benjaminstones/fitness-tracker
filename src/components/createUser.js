import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const updateUsername = e => setUsername(e.target.value);

    const onSubmit = e => {
        const user = {
            username: username
        }
        axios.post('http://localhost:5001/users/add', user).then(res => setSubmitted(true));
        return false;
    }

    return (
        <>
            <h3>Create New User</h3>
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
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input
                        value={username}
                        onChange={updateUsername}
                    />
                </Form.Item>
                {submitted && <Alert message="User added" type="success" showIcon />}
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default CreateUser;