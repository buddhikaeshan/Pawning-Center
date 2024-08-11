import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

const Form = ({ onClose }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        nic: '',
        address: '',
        phone: '',
        startDate: '',
        category: '',
        itemName: '',
        priceOfItem: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/submit', formData);
    
            // Check if response status is 201
            if (response.status === 201) {
                alert('Data submitted successfully!');
                window.close(); 
                // Reload the /Customers page
                window.opener.location.href = '/Customers';
            } else {
                alert('Unexpected response from server');
            }
        } catch (error) {
            console.error('Error submitting data', error);
            alert('Error submitting data');
        }
    };
    
    

    return (
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
            <div className="bg-light rounded p-4 shadow-lg w-100 overflow-auto" style={{ maxWidth: '400px', maxHeight: '90vh' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '1.5rem' }}>Fill the Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="customerName" className="form-label" style={{ fontSize: '0.9rem' }}>Customer Name</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="customerName"
                            placeholder="Type Customer Name"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="nic" className="form-label" style={{ fontSize: '0.9rem' }}>NIC</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="nic"
                            placeholder="Type Customer NIC"
                            value={formData.nic}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="address" className="form-label" style={{ fontSize: '0.9rem' }}>Address</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="address"
                            placeholder="Type Customer Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="phone" className="form-label" style={{ fontSize: '0.9rem' }}>Phone Number</label>
                        <input
                            type="tel"
                            className="form-control form-control-sm"
                            id="phone"
                            placeholder="Type Customer Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="startDate" className="form-label" style={{ fontSize: '0.9rem' }}>Start Date</label>
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            id="startDate"
                            placeholder="Select Today Date"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="category" className="form-label" style={{ fontSize: '0.9rem' }}>Item Category</label>
                        <select
                            className="form-select form-select-sm"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select item category</option>
                            <option>Phone</option>
                            <option>Golden</option>
                            <option>Vehicle</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="itemName" className="form-label" style={{ fontSize: '0.9rem' }}>Item Name</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="itemName"
                            placeholder="Type Item Name / IMEI / Number Plate / etc.."
                            value={formData.itemName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="priceOfItem" className="form-label" style={{ fontSize: '0.9rem' }}>Price of Item</label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            id="priceOfItem"
                            placeholder="Type Price Of Item"
                            value={formData.priceOfItem}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-between mt-3">
                        <button type="button" className="btn btn-danger btn-sm" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary btn-sm">Enter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
