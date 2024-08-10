import React from 'react';
import Sidebar from '../../components/Sidebar';
import './Customers.css';

const Customers = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="col py-3 content-area">
                    <h1 className="text-center mb-4">Customer Details</h1>

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">

                        <div className="input-group w-100 w-md-50 mb-3 mb-md-0">
                            <input type="text" className="form-control" placeholder="Search" />
                            <button className="btn btn-outline-secondary">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        
                        <div className="ms-md-3 mt-3 mt-md-0">
                            <button className="btn btn-success btn-sm">Add Customer</button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>NIC</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Item Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>001</td>
                                    <td>customer name</td>
                                    <td>**********</td>
                                    <td>12, Kandy Kandy</td>
                                    <td>77******</td>
                                    <td>item name</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm me-2">Update</button>
                                        <button className="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
