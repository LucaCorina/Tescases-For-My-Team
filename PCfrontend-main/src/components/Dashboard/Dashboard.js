import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import './Dashboard.css';
import MainPage from './MainDashboard/MainPage';
import Userlist from './Userlist/Userlist';
import Login from './Login';
import Tasks from './Tasks/Tasks';



function Dashboard() {
    let { id } = useParams();
    const [users, updateUsers] = useState([]);
    const { state, pathname } = useLocation();
    const navigation = useNavigate();
    const pageName = pathname.split('dashboard/');

    console.log(pageName);
    console.log(pathname);
    console.log(state);
    const renderContent = () => {
        if (pageName[1]) {
            switch (pageName[1]) {
                case 'users':
                    return <Userlist />;
                case 'tasks':
                    return <Tasks />;
            }
        } else {
            return <MainPage />

        }
    }
    useEffect(function effectFunction() {
        async function fetchUsers() {
            const response = await fetch('http://localhost:3606/users/whoami', {
                method: 'GET', headers: {
                    "Authorization": state.token,
                }
            });

            const json = await response.json();
            console.log(json);
            updateUsers(json);
            console.log(users);
            //console.log(match);
        }
        if (!state) {
            return navigation("/login");
        }
        fetchUsers();
    }, []);
    const getUsers = (e) => { }
    return (
        <div id="content">
            <header><Topbar /></header>
            <div className='container'>
                <Sidebar />
                {/* if(id==users{render}) */}
                <div className='leftSide'>

                    {renderContent()}


                </div>
            </div>
        </div >
    );
};
export default Dashboard;