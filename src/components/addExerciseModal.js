import { Button, Modal } from 'antd';
import "antd/dist/antd.css";
import React, { useState } from 'react';
import AddExerciseModalForm from './addExerciseModalForm';

const AddExerciseModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Exercise
      </Button>
      <Modal title="Add Exercise" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <AddExerciseModalForm />
      </Modal>
    </>
  );
};

export default AddExerciseModal;