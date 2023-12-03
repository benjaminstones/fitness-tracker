import { Button, Form, Input, Select } from 'antd';
import React, { useContext } from 'react';
import { ExercisesContext } from './CreateWorkout/CreateWorkout';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddExerciseModalForm = (props) => {

  const exercises = useContext(ExercisesContext);

  const handleClick = (values) => {
    props.clickHandler(values);
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={handleClick}>
      <Form.Item name="name" label="Exercise" rules={[{ required: true }]}>
        <Select>
          {
            exercises.map((exercise) => {
              return <Option
                key={exercise}
                value={exercise}>{exercise}
              </Option>;
            })
          }
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddExerciseModalForm;
