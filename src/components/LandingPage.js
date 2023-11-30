import React from 'react';
import './LandingPage.css';
import videoBg from '../resources/videoBg.mp4';
import workoutSvg from '../resources/workout.svg';
import editSvg from '../resources/edit.svg';
import exerciseSvg from '../resources/exercise.svg';
import userSvg from '../resources/user.svg';
import { Button } from 'antd';

function LandingPage() {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="landing-page">
      <video src={videoBg} autoPlay loop muted id="video-background"></video>
      <div className="content">
        <h1>Welcome to my Fitness Tracker!</h1>
        <p>Track your workouts, and monitor your progress!</p>
      </div>
      <div className="icon-container">
        {[
          { svg: workoutSvg, text: 'Workouts', path: '/workouts' },
          { svg: editSvg, text: 'Create Workout Log', path: '/create' },
          { svg: exerciseSvg, text: 'Create Exercise', path: '/exercise' },
          { svg: userSvg, text: 'Create User', path: '/user' },
        ].map((item, index) => (
          <div className="icon-item" key={index} onClick={() => handleNavigation(item.path)}>
            <img src={item.svg} alt={item.text} />
            <Button type="primary">{item.text}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
