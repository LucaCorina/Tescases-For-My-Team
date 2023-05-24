import React, { useState, useRef, useEffect } from 'react';
import './userList.css';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
export default function Userlist() {
    const [token, setAuthToken] = useState('');
    const [users, updateUsers] = useState([]);
    const { state, pathname } = useLocation();
    useEffect(function effectFunction() {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3606/flats/getAllFlatmates', {
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
        <div id="content">

            <div className='rightSide'>

                <div className='userList'>
                    <div className='featuredItem'>
                        <span className='featuredTitle'>
                            Roommates
                        </span>
                        <div className="container">

                            <table className="table table-striped table-bordered" >
                                    <thead >
                                            <tr>
                                                <th >Username </th>
                                                <th>Name </th>
                                                <th>Surname </th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                            {users && users.map((user, i) => 
                                                <tr key={i}>
    
                                                    <td >{user.Username}</td>
                                                    <td>{user.Name}</td>
                                                    <td>{user.Surname}</td>
                                                </tr>
                                        
                                            )}
                                    </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    )
}
