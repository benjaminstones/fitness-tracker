import React from 'react';
// import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";

const CreateExercise = () => {
    // const [username, setUsername] = useState('');
    // const [description, setDescription] = useState('');
    // const [duration, setDuration] = useState(0);
    // const [date, setDate] = useState(new Date());
    // const [users, setUsers] = useState([

  // this.onChangeUsername = this.onChangeUsername.bind(this);

    // onChangeUsername(e) {
    //     setUsername(e.target.value)
    // };

    // onChangeDescription(e) {
    //     setDescription(e.target.value)
    // };

    // onChangeDuration(e) {
    //     setDuration(e.target.value)
    // };

    // onChangeDate(date) {
    //     setDate(date)
    // };

    // onSubmit(e) {
    //     e.preventDefault();
    
    //     const exercise = {
    //       username: username,
    //       description: description,
    //       duration: duration,
    //       date: date
    //     }

    //     console.log(exercise);
    //     window.location = '/';
    // }
    return (
        <div>
          <h3>Create New Exercise Log</h3>
          <form>
          {/* <form onSubmit={this.onSubmit}> */}
            <div className="form-group"> 
              <label>Username: </label>
              <select 
                  required
                  className="form-control"
                //   value={this.state.username}
                //   onChange={this.onChangeUsername}
                >
                  {
                    // this.state.users.map(function(user) {
                    //   return <option 
                    //     key={user}
                    //     value={user}>{user}
                    //     </option>;
                    // })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                //   value={this.state.description}
                //   onChange={this.onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                //   value={this.state.duration}
                //   onChange={this.onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                {/* <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                /> */}
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