import React, { useState, useEffect } from 'react';
import { Button, TextField, Input, InputLabel, Select, MenuItem, useTheme, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import "./tasks.css"
//import "..Reports/report.css"
export default function Tasks() {


const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  const classes = useStyles();
  const [userResponsable, setuserResponsable] = React.useState([]);
  const handleChange = (event) => {
    setuserResponsable(event.target.value);
  };


    const [visibleC, setVisibleC] = React.useState(false);
    const [visibleU, setVisibleU] = React.useState(false);
    const btnStyle = { margin: '8px 2px' };
    const [tasks, updateTasks] = useState([]);

    const [selectedTask, setSelectedTask] = useState({});

    //const [rows, setRows] = useState([]);
    const { state, pathname } = useLocation();
    //pt create
    const [Task_name, setTaskname] = useState('');
    const [User_ID, setResponsable] = useState('');
    const [Task_ID, setTaskID] = useState('');
    const [Status, setStatus] = useState('');
    const handleTaskName = (e) => {
        //setTaskname({ ...selectedTask, Task_name: e.target.value });
        setTaskname(e.target.value);
    };
    const handleResponsable = (e) => {
        setResponsable(e.target.value);
    };
    const handleStatus = (e) => {
        setStatus(e.target.value);
    };
    //CREATE TASK
    const handleCreatetask = async (e) => {
        e.preventDefault();
        const taskCall = await fetch('http://localhost:3600/tasks/createtask', {
            method: 'POST',
            headers: {
                "Authorization": state.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ Task_name: Task_name, User_ID: userResponsable, Status: Status })
        });
        if (taskCall) {

            async function fetchTasks() {
                const response = await fetch('http://localhost:3600/tasks/getTasksByUserFlatmates', {
                    method: 'GET', headers: {
                        "Authorization": state.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                let json = await response.json();
                updateTasks(json);
            }
            fetchTasks();
        }
        // 
        async function fetchTasks() {
            const response = await fetch('http://localhost:3600/tasks/getTasksByUserFlatmates', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });
            let json = await response.json();
            updateTasks(json);
        }
        fetchTasks();

    }
    //GET TASKS FROM DB
    useEffect(function effectFunction() {
        async function fetchTasks() {
            const response = await fetch('http://localhost:3600/tasks/getTasksByUserFlatmates', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }
            });
            let json = await response.json();
            updateTasks(json);
        }
        fetchTasks();
    }, []);
    const getTasks = (e) => {
    }
    //update method
    const onUpdate = async (e, selectedTask) => {
        let { Task_ID, ...payload } = selectedTask;
        e.preventDefault();
        const taskCall = await fetch('http://localhost:3600/tasks/updateTask', {
            method: 'PUT',
            headers: {
                "Authorization": state.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({Task_ID: Task_ID, Task_name: Task_name, User_ID: userResponsable, Status: Status })
        });
        
        if (taskCall) {

            async function fetchTasks() {
                const response = await fetch('http://localhost:3600/tasks/getTasksByUserFlatmates', {
                    method: 'GET', headers: {
                        "Authorization": state.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                let json = await response.json();
                updateTasks(json);
            }
            fetchTasks();
            //setVisibleU(false);

        }
    }
    //delete function
    const onDelete = async (Task_ID) => {
        const taskCall = await fetch('http://localhost:3600/tasks/deleteTask', {
            method: 'DELETE',
            headers: {
                "Authorization": state.token,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ Task_ID: Task_ID })

        });
        if (taskCall) {

            async function fetchTasks() {
                const response = await fetch('http://localhost:3600/tasks/getTasksByUserFlatmates', {
                    method: 'GET', headers: {
                        "Authorization": state.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
                let json = await response.json();
                updateTasks(json);
            }
            fetchTasks();

        }
    }

    const [users, updateUsers] = useState([]);
    useEffect(function effectFunction() {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3600/flats/getAllFlatMembers', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                }

            }).then()
            const json = await response.json();
          
            updateUsers(json);

        }
        
        fetchUsers();
    }, []);

    return (
        <div>

            <div className='rightSide'>
                <div>
                    <Button id="createBtn" variant='contained' color="primary" onClick={() => setVisibleC(true)}>Create task</Button>
                </div>    
                
                
                <div className='featuredItem'>
                    <div>
                        <h2>List of tasks</h2>
                        {/*<button onClick={}>Tasks</button> */}
                    </div>
                    <table className="table table-striped table-bordered" >
                        <thead >
                            <tr>
                                <th >Task name</th>
                                <th >User Responsable</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks && tasks.map((task, id) =>
                                <tr key={id}>
                                    <td >{task.Task_name}</td>
                                    <td >{task.Name} {task.Surname}</td>
                                    <td >{task.Status}</td>
                                    <td><Button color="primary" variant='outlined' onClick={() => { setSelectedTask(task); setVisibleU(true) }}>Update</Button></td>
                                    <td> <Button color="primary" variant='outlined' onClick={() => onDelete(task.Task_ID)}> Delete</Button></td>
                           
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>          
               
        { visibleC && (<div className='featuredItem create' visiblility={visibleC} >
            <div>
                <h2>Add a new task</h2>
            </div>
            <TextField id="outlined-basic" label="Task name" variant="standard"
                fullWidth style={btnStyle} onChange={handleTaskName} />
            <TextField id="outlined-basic" label="Status" variant="standard"
                fullWidth style={btnStyle} onChange={handleStatus} />
                      
                    <div>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-standard-label">User Responsable</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={userResponsable}

                            onChange={handleChange}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                        {users.map((user) => (
                        <MenuItem key={user.User_ID} value={user.User_ID} >
                                    {user.Username}
                        </MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                    </div>

                <Button type='submit' variant='contained' color="primary" onClick={handleCreatetask} style={btnStyle} >Add to list </Button> 
                </div>
               )}



                    {/*update a task*/}
                { visibleU && (<div className='featuredItem update' visiblility={visibleU} > 
                <div>
                    <h2>Update a task</h2>
                </div>
                <TextField id="outlined-basic" label="ID" variant="standard"
                fullWidth sx={{ display: 'none' }} value={selectedTask.Task_ID}/>
                    <TextField id="outlined-basic" value={selectedTask.Task_name} label="Task name" onChange={handleTaskName} variant="standard"

                        fullWidth style={btnStyle} />
                    <TextField id="outlined-basic" label="New name" variant="standard"
                fullWidth style={btnStyle} onChange={handleTaskName} />
                     <TextField id="outlined-basic" label="Status" variant="standard"
                fullWidth style={btnStyle} onChange={handleStatus} />
                <div> 
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-standard-label">User Responsable</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={userResponsable}

                        onChange={handleChange}
                        input={<Input />}
                        MenuProps={MenuProps}
                    >
                        {users.map((user) => (
                           <MenuItem key={user.User_ID} value={user.User_ID} >
                           {user.Username}
               </MenuItem>
               ))}
               </Select>
               </FormControl>
           </div>

                    <Button type='submit' variant='contained' color="primary" style={btnStyle} onClick={(e) => onUpdate(e,selectedTask)}>Update the task
                    </Button>
                </div>

    )}
    </div>
    </div>
)}
