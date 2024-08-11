import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = ({ onClose }) => {
    return (
        <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
            <div className="bg-light rounded p-4 shadow-lg w-100 overflow-auto" style={{ maxWidth: '400px', maxHeight: '90vh' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '1.5rem' }}>Fill the Form</h2>
                <form>
                    <div className="mb-2">
                        <label htmlFor="full-name" className="form-label" style={{ fontSize: '0.9rem' }}>Name</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="full-name"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="address-line-1" className="form-label" style={{ fontSize: '0.9rem' }}>NIC</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="address-line-1"
                            placeholder="123 Main St"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="address-line-2" className="form-label" style={{ fontSize: '0.9rem' }}>Address</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="address-line-2"
                            placeholder="Apt 4B"
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="phone" className="form-label" style={{ fontSize: '0.9rem' }}>Phone Number</label>
                        <input
                            type="tel"
                            className="form-control form-control-sm"
                            id="phone"
                            placeholder="(123) 456-7890"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="state" className="form-label" style={{ fontSize: '0.9rem' }}>Start Date</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="state"
                            placeholder="California"
                            required
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="country" className="form-label" style={{ fontSize: '0.9rem' }}>Item Category</label>
                        <select className="form-select form-select-sm" id="country" required>
                            <option value="" disabled selected>Select your country</option>
                            <option>USA</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="postal-code" className="form-label" style={{ fontSize: '0.9rem' }}>Item Name</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="postal-code"
                            placeholder="94103"
                            required
                        />
                    </div>
                    
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label" style={{ fontSize: '0.9rem' }}>Valued Price</label>
                        <input
                            type="email"
                            className="form-control form-control-sm"
                            id="email"
                            placeholder="example@example.com"
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
