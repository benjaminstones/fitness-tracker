import { Button, Modal } from 'antd';
import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import AddExerciseModalForm from './AddExerciseModalForm';
import './AddExerciseModal.css';

const AddExerciseModal = ({ clickHandler, exercise }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => {
    if (exercise) {
      setCurrentExercise(exercise);
      setIsModalVisible(true);
    }
  }, [exercise]);

  const handleClick = (exercise) => {
    clickHandler(exercise);
    setIsModalVisible(false); // Close modal after adding/updating exercise
  };

  const showModal = () => {
    setCurrentExercise(null); // Reset exercise data
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
      <Modal 
        title={currentExercise ? "Edit Exercise" : "Add Exercise"} 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <AddExerciseModalForm clickHandler={handleClick} exercise={currentExercise} />
      </Modal>
    </>
  );
};

export default AddExerciseModal;
