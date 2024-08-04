import { Button, Modal } from 'antd';
import "antd/dist/antd.css";
import React, { useState } from 'react';
import AddExerciseModalForm from './AddExerciseModalForm';
import './AddExerciseModal.css';

const AddExerciseModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = (exercise) => {
    props.clickHandler(exercise);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Exercise
      </Button>
      <Modal title="Add Exercise" visible={isModalVisible} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }}>
        <AddExerciseModalForm clickHandler={handleClick} />
      </Modal>
    </>
  );
};

export default AddExerciseModal;
