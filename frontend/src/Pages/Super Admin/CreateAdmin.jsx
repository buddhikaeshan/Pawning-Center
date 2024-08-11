






import React from 'react';
import Sidebar from '../../components/Sidebar';
import './Dashboard.css';

const CreateAdmin = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />

                <div className="col py-3 content-area">
                    
                    <main className="col-md-12 p-3 bg-white">
                        <div className="row">

                            <div className="card shadow-lg rounded-lg p-4">
                                <h1 className="text-center mb-4">Add New Admins</h1>
                                <form className="space-y-4">
                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label font-weight-bold">User name</label>
                                        <input type="text" id="username" className="form-control" placeholder="Enter user name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label font-weight-bold">Email</label>
                                        <input type="email" id="email" className="form-control" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label font-weight-bold">Password</label>
                                        <input type="password" id="password" className="form-control" placeholder="Enter password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm-password" className="form-label font-weight-bold">Confirm Password</label>
                                        <input type="password" id="confirm-password" className="form-control" placeholder="Confirm password" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="account-type" className="form-label font-weight-bold">Account type</label>
                                        <select id="account-type" className="form-control">
                                            <option value="" disabled selected>Select category</option>
                                            <option value="admin">Admin</option>
                                            <option value="editor">Editor</option>
                                            <option value="viewer">Viewer</option>
                                        </select>
                                    </div>
                                    <div className="d-flex justify-content-between mt-4">
                                        <button type="submit" className="btn btn-success">Save</button>
                                        <button type="button" className="btn btn-danger">Reset</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CreateAdmin;
