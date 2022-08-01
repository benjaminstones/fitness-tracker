import React from 'react';
import DatePicker from "react-datepicker";
import { useState } from "react";

const CreateExercise = () => {
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState(['Ben', 'Jack', 'David'])

  const updateUsername = e => setUsername(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updateDuration = e => setDuration(e.target.value);


  const onSubmit = e => {
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }

    console.log(exercise);
  }
    return (
        <div>
          <h3>Create New Exercise Log</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select type="text" 
                  required
                  className="form-control"
                  onChange={updateUsername}
                >
                  {
                    users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                   onChange={updateDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                  onChange={updateDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
}

export default CreateExercise;