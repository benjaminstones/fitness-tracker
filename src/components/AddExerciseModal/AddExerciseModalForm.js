import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddExerciseModalForm = (props) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:5001/exercises/');
        if (response.data.length > 0) {
          const exerciseNames = response.data.map((exercise) => exercise.name);
          setExercises(exerciseNames);
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const handleClick = (values) => {
    const exerciseData = {
      ...values,
      id: props.exercise && props.exercise._id ? props.exercise._id : null
    };    
    props.clickHandler(exerciseData);
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (props.exercise) {
      form.setFieldsValue(props.exercise);
    } else {
      onReset();
    }
  }, [props.exercise, form]);

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleClick}>
      {loading ? (
        <p>Loading exercises...</p>
      ) : exercises.length > 0 ? (
        <>
          <Form.Item name="name" label="Exercise" rules={[{ required: true }]}>
            <Select>
              {exercises.map((exercise) => (
                <Option key={exercise} value={exercise}>
                  {exercise}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sets" label="Sets" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="reps" label="Reps" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="add-button">
              {props.exercise ? 'Update' : 'Add'}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Clear
            </Button>
          </Form.Item>
        </>
      ) : (
        <p>No exercises available.</p>
      )}
    </Form>
  );
};

export default AddExerciseModalForm;
