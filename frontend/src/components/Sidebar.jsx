import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar bg-dark text-white">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100 center">
                 <div className="sidebar-center">
                     <NavLink to="/Dashboard" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="caption">Super Admin</span>
                </NavLink>
              
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm">
                    <li className="nav-item">
                        <NavLink to="/Dashboard" className={({ isActive }) => "btn navlink align-middle px-3 mb-4 " + (isActive ? "active" : "")}>
                            <i className="fs-4 bi-house"></i>
                            <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Customers" className={({ isActive }) => "btn navlink px-3 align-middle mb-4 " + (isActive ? "active" : "")}>
                            <i className="fs-4 bi bi-person-vcard-fill"></i>
                            <span className="ms-1 d-none d-sm-inline">Customers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Products" className={({ isActive }) => "navlink btn px-3 align-middle mb-4 " + (isActive ? "active" : "")}>
                            <i className="fs-4 bi-grid"></i>
                            <span className="ms-1 d-none d-sm-inline">Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Interest" className={({ isActive }) => "navlink btn px-3 align-middle mb-4 " + (isActive ? "active" : "")}>
                            <i className="fs-4 bi bi-currency-exchange"></i>
                            <span className="ms-1 d-none d-sm-inline">Interest</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/CreateAdmin" className={({ isActive }) => "navlink btn px-3 align-middle mb-4 " + (isActive ? "active" : "")}>
                            <i className="fs-4 bi bi-person-plus"></i>
                            <span className="ms-1 d-none d-sm-inline">Create Admin</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Profile" className={({ isActive }) => "navlink btn px-3 align-middle mb-4 " + (isActive ? "active" : "")}>
                            <i className="fs-4 bi bi-gear"></i>
                            <span className="ms-1 d-none d-sm-inline">Settings</span>
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <NavLink to="/" className="logout">
                            <span className="">Log out</span>
                        </NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
