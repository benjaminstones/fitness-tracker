import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import './CreateUser.css'

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [failure, setFailure] = useState(false);

  const updateUsername = (e) => setUsername(e.target.value);

  const onSubmit = (e) => {
    const user = {
      username: username,
    };
    axios
      .post('http://localhost:5001/users/add', user)
      .then((res) => setSubmitted(true))
      .catch((error) => {
        setFailure(true);
        console.log(error);
      });
    return false;
  };

  return (
    <div className="create-user-container"> 
      <div className="content">
        <h1>Create New User</h1>
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
            <Input value={username} onChange={updateUsername} />
          </Form.Item>
          {submitted && <Alert message="User added" type="success" showIcon />}
          {failure && (
            <Alert message="Unable to submit user" type="error" showIcon />
          )}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateUser;
