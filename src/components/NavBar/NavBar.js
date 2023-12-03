import { Menu, Space } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import workoutSvg from '../../resources/workout.svg';
import editSvg from '../../resources/edit.svg';
import exerciseSvg from '../../resources/exercise.svg';
import userSvg from '../../resources/user.svg';
import homeSvg from '../../resources/home.svg';
import './NavBar.css';

const NavBar = () => {
  return (
    <Menu mode="horizontal" theme="dark" id="menu">
      <Menu.Item key="/">
        <NavLink to="/">
          <Space>
            <img src={homeSvg} alt="Home" />
            <span>Home</span>
          </Space>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/workouts">
        <NavLink to="/workouts">
          <Space>
            <img src={workoutSvg} alt="Workouts"  />
            <span>Workouts</span>
          </Space>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/create">
        <NavLink to="/create">
          <Space>
            <img src={editSvg} alt="Create Workout Log" />
            <span>Create Workout Log</span>
          </Space>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/user">
        <NavLink to="/user">
          <Space>
            <img src={userSvg} alt="Create User"  />
            <span>Create User</span>
          </Space>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/exercise">
        <NavLink to="/exercise">
          <Space>
            <img src={exerciseSvg} alt="Create Exercise" />
            <span>Create Exercise</span>
          </Space>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
