import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './Customers.css';
import axios from 'axios';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const openFormWindow = () => {
        window.open('/Form', 'Form', 'width=600,height=800');
    };

    // Filter customers based on search term
    const filteredCustomers = customers.filter(customer =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.nic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://localhost:5000/api/customers/${id}`);
                setCustomers(customers.filter(customer => customer._id !== id)); // Update local state
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="col py-3 content-area">
                    <h1 className="text-center mb-4">Customer Details</h1>

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                        <div className="input-group w-100 w-md-50 mb-3 mb-md-0">
                            <input
                                type="search"
                                className="form-control"
                                id="datatable-search-input"
                                placeholder="Search Name or Nic"
                                value={searchTerm} // Bind input value to searchTerm state
                                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                            />
                        </div>

                        <div className="ms-md-3 mt-3 mt-md-0">
                            <button className="btn btn-success btn-sm" onClick={openFormWindow}>
                                Add Customer
                            </button>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>NIC</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((customer, index) => (
                                    <tr key={customer._id}>
                                        <td>{index + 1}</td>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.nic}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.phone}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm me-2">Update</button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(customer._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
