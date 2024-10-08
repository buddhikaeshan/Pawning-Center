import React from 'react';
import { NavLink } from 'react-router-dom';  // Import NavLink
import './Dashboard.css';

import SidebarAdmin from '../../components/SidebarAdmin';

const DashboardAdmin = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SidebarAdmin/>

                <div className="col py-3 content-area">
                    <h3 className='caption'>Dashboard</h3>
                    <main className="col-md-12 p-3 bg-white">
                        <div className="row">
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/CustomersAdmin" 
                                    className="p-3 tabs cusTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Customer Details
                                </NavLink>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/InterestAdmin" 
                                    className="p-3 tabs calTab  d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Calculate Interest
                                </NavLink>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/ProductsAdmin" 
                                    className="p-3 tabs addTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Add Products/Items
                                </NavLink>
                            </div>
                            {/* <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/CreateAdmin" 
                                    className="p-3 tabs createAdTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Create Admins
                                </NavLink>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/Report" 
                                    className="p-3 tabs reportTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Monthly Report
                                </NavLink>
                            </div> 
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/ProfileAdmin" 
                                    className="p-3 tabs setTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Account Settings
                                </NavLink>
                            </div>*/}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
