import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';



const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                {/* Sidebar */}
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to="/"
                            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                        >
                            <span className="fs-5 d-none d-sm-inline">Super Admin</span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu"
                        >
                            <li className="nav-item ">
                                <Link to="#" className="nav-link align-middle px-3 mb-4 active">
                                    <i className="fs-4 bi-house"></i>{' '}
                                    <span className="ms-1 d-none d-sm-inline"> Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#submenu1"
                                    data-bs-toggle="collapse"
                                    className="nav-link px-3 align-middle mb-4"
                                >
                                    <i className="fs-4 bi bi-person-vcard-fill"></i>{' '}
                                    <span className="ms-1 d-none d-sm-inline"> Customers</span>
                                </Link>

                            </li>
                            <li>
                                <Link to="#" className="nav-link px-3 align-middle mb-4">
                                    <i className="fs-4 bi bi-currency-exchange"></i>{' '}
                                    <span className="ms-1 d-none d-sm-inline"> Interest</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="#submenu3"
                                    data-bs-toggle="collapse"
                                    className="nav-link px-3 align-middle mb-4"
                                >
                                    <i className="fs-4 bi-grid"></i>{' '}
                                    <span className="ms-1 d-none d-sm-inline">Products</span>
                                </Link>
                                <ul
                                    className="collapse nav flex-column ms-1"
                                    id="submenu3"
                                    data-bs-parent="#menu"
                                >
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-3 ">
                                            <span className="d-none d-sm-inline">Product</span> 1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-3">
                                            <span className="d-none d-sm-inline">Product</span> 2
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-3">
                                            <span className="d-none d-sm-inline">Product</span> 3
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-3">
                                            <span className="d-none d-sm-inline">Product</span> 4
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <Link
                                    to="#submenu2"
                                    data-bs-toggle="collapse"
                                    className="nav-link px-3 align-middle mb-4"
                                >
                                    <i className="fs-4 bi bi-person-plus"></i>{' '}
                                    <span className="ms-1 d-none d-sm-inline">Create Admin</span>
                                </Link>
                                <ul
                                    className="collapse nav flex-column ms-1"
                                    id="submenu2"
                                    data-bs-parent="#menu"
                                >
                                    <li className="w-100">
                                        <Link to="#" className="nav-link px-3">
                                            <span className="d-none d-sm-inline">Item</span> 1
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="nav-link px-3">
                                            <span className="d-none d-sm-inline">Item</span> 2
                                        </Link>
                                    </li>
                                </ul>
                            </li>


                            <li>
                                <Link to="#" className="nav-link px-3 align-middle mb-4">
                                    <i className="fs-4 bi bi-gear"></i>{' '}
                                    <span className="ms-1 d-none d-sm-inline">Settings</span>
                                </Link>
                            </li>
                        </ul>
                        <hr />

                        <button className="btn btn-danger w-100 mb-5">Log out</button>

                    </div>
                </div>
                {/* Main Content */}
                <div className="col py-3">
                    <h3>Dashboard</h3>
                    
                    <main className="col-md-12 p-3 bg-white" >
                            
                            <div className="row" >

                                <div className="col-md-4 mb-3" id='dMain'>
                                    <div className="p-3 bg-warning text-dark rounded" id='pMain'>Customer Details</div>
                                </div>

                                <div className="col-md-4 mb-3" id='dMain'>
                                    <div className="p-3 bg-success text-white rounded" id='pMain'>Calculate Interest</div>
                                </div>

                                <div className="col-md-4 mb-3" id='dMain'>
                                    <div className="p-3 bg-secondary text-white rounded" id='pMain'>Add Products/Items</div>
                                </div>

                                <div className="col-md-4 mb-3" id='dMain'>
                                    <div className="p-3 bg-info text-white rounded" id='pMain'>Create Admins</div>
                                </div>


                                <div className="col-md-4 mb-3" id='dMain'>
                                    <div className="p-3 bg-danger text-dark rounded" id='pMain'>Monthly Report</div>
                                </div>
                                
                                
                                <div className="col-md-4 mb-3" id='dMain'>
                                    <div className="p-3 bg-warning text-dark rounded" id='pMain'>Account Settings</div>
                                </div>
                            </div>
                        </main>
                    
                </div>
            </div>
        </div>
    );
};



export default Dashboard;
