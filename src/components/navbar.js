import { Menu } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (<Menu mode="horizontal">
        <Menu.Item key="/">
            <NavLink to="/">
                <span>Workouts</span>
            </NavLink>
        </Menu.Item>
        <Menu.Item key="/create">
            <NavLink to="/create">
                <span>Create Workout Log</span>
            </NavLink>
        </Menu.Item>
        <Menu.Item key="/user">
            <NavLink to="/user">
                <span>Create User</span>
            </NavLink>
        </Menu.Item>

    </Menu>
    );
}

export default NavBar;