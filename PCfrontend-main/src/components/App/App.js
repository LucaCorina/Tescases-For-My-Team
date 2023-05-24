import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Userlist from "./components/Userlist/Userlist";
import Expenses from "./components/Expenses/Expenses";
import Reports from "./components/Reports/Reports";
import Tasks from "./components/Tasks/Tasks";
import Settings from "./components/Settings/Settings";
import Register2 from "./components/Register2";
import Report from "./components/Reports/Report";

function App() {
  return (
    <div className="App">
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/step/:id" element={<Register2 />} />

            {/* <Route path="/dashboard/:id" element={<Dashboard match />} /> */}
            <Route exact path="/dashboard/*" element={<Dashboard />} />

            {/* <Route path="/dashboard/users" element={<Userlist />} /> */}
            {/* <Route path="/dashboard/expenses" element={<Expenses />} />
            <Route path="/dashboard/reports" element={<Report />} />
            <Route path="/dashboard/tasks" element={<Tasks />} /> */}
            {/* <Route path="/dashboard/settings" element={<Settings />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
