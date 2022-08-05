import React, { useState } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const CreateUser = () => {
const [username, setUsername] = useState('');

const updateUsername = e => setUsername(e.target.value);

const onSubmit = e => {
    e.preventDefault();

    const user = {
      username: username
    }

    axios.post('http://localhost:5001/users/add', user).then(res => console.log(res.data))

    console.log(user);

  }

return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input  type="text"
              required
              className="form-control"
              value={username}
              onChange={updateUsername}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateUser;