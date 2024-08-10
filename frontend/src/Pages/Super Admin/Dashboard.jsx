import React from 'react';
import Sidebar from '../../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                {/* Main Content */}
                <div className="col py-3 content-area">
                    <h3>Dashboard</h3>
                    <main className="col-md-12 p-3 bg-white">
                        <div className="row">
                            <div className="col-md-4 mb-3" id="dMain">
                                <div className="p-3 bg-warning text-dark rounded" id="pMain">Customer Details</div>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <div className="p-3 bg-success text-white rounded" id="pMain">Calculate Interest</div>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <div className="p-3 bg-secondary text-white rounded" id="pMain">Add Products/Items</div>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <div className="p-3 bg-info text-white rounded" id="pMain">Create Admins</div>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <div className="p-3 bg-danger text-dark rounded" id="pMain">Monthly Report</div>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <div className="p-3 bg-warning text-dark rounded" id="pMain">Account Settings</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
