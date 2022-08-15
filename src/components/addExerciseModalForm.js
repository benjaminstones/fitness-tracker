import { Button, Form, Input, Select } from 'antd';
import React from 'react';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddExerciseModalForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item name="exercise" label="Exercise" rules={[{ required: true }]}>
        <Select>
        <Option value="benchpress">Bench Press</Option>
        <Option value="squat">Squat</Option>
        </Select>
      </Form.Item>
      <Form.Item name="sets" label="Sets" rules={[{ required: true }]}>
          <Input />
      </Form.Item>
      <Form.Item name="reps" label="Reps" rules={[{ required: true }]}>
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
