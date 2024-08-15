import React, { useEffect, useState } from 'react';

import axios from 'axios';
import './Products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SidebarAdmin from '../../components/SidebarAdmin';

const ProductsAdmin = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null); // State to track selected item
    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
        name: true,
        nic: true,
        address: false,
        phone: false,
        startDate: true,
        category: false,
        itemName: true,
        priceOfItem: true,
        endDate: true,
        interest: false,
        discount: true,
        totalPrice: true,
        status: true,
        actions: true,
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const handleColumnToggle = (event) => {
        const { name, checked } = event.target;
        setColumnVisibility((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredItems = items.filter((item) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            item.customerName.toLowerCase().includes(lowerCaseQuery) ||
            item.nic.toLowerCase().includes(lowerCaseQuery) ||
            item.itemName.toLowerCase().includes(lowerCaseQuery)
        );
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await axios.delete(`http://localhost:5000/api/items/${id}`);
                setItems(items.filter(item => item._id !== id)); // Update local state
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleUpdate = (item) => {
        setSelectedItem(item);
    };

    const handleSaveChanges = async () => {
        if (selectedItem) {
            // Calculate the total price before updating
            const totalPrice = calculateTotalPrice(
                selectedItem.priceOfItem,
                selectedItem.interest,
                selectedItem.duration
            );
            const updatedItem = { ...selectedItem, totalPrice };
    
            try {
                const response = await axios.put(`http://localhost:5000/api/items/${updatedItem._id}`, updatedItem, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                console.log('Item updated:', response.data);
    
                // Update local state
                setItems(items.map(item => item._id === updatedItem._id ? response.data : item));
    
                // Close modal
                setSelectedItem(null);
                const modal = document.getElementById('updateModal');
                const modalInstance = window.bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
                window.location.reload();
            } catch (error) {
                console.error('Error updating item:', error.response ? error.response.data : error.message);
            }
        }
    };
    
    const handlePaymentReceived = async () => {
        if (selectedItem) {
            // Calculate the total price before updating
            const totalPrice = calculateTotalPrice(
                selectedItem.priceOfItem,
                selectedItem.interest,
                selectedItem.duration
            );
            const updatedItem = { ...selectedItem, status: 'Payment Received', totalPrice };
    
            try {
                await axios.put(`http://localhost:5000/api/items/${selectedItem._id}`, updatedItem);
                setItems(items.map(item => item._id === selectedItem._id ? updatedItem : item));
                setSelectedItem(null);
                const modal = document.getElementById('updateModal');
                const modalInstance = window.bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
                window.location.reload();
                // Generate PDF
                const doc = new jsPDF();
                const date = new Date().toLocaleString();

                // Title
                doc.setFontSize(18);
                doc.text('Payment Receipt', 14, 22);

                // Date
                doc.setFontSize(12);
                doc.text(`Date: ${date}`, 14, 30);

                // Table
                doc.autoTable({
                    startY: 40,
                    head: [['Field', 'Value']],
                    body: [
                        ['Customer Name', selectedItem.customerName],
                        ['NIC', selectedItem.nic],
                        ['Address', selectedItem.address],
                        ['Phone', selectedItem.phone],
                        ['Item Category', selectedItem.category],
                        ['Item Name', selectedItem.itemName],
                        ['Start Date', selectedItem.startDate ? selectedItem.startDate.slice(0, 10) : 'N/A'],
                        ['End Date', selectedItem.endDate ? selectedItem.endDate.slice(0, 10) : 'N/A'],
                        ['Price of Item', selectedItem.priceOfItem],
                        ['Interest %', selectedItem.interest],
                        ['Discount', selectedItem.discount],
                        ['Total Price', selectedItem.totalPrice],
                    ],
                    styles: {
                        halign: 'center',
                        valign: 'middle',
                    },
                    headStyles: {
                        fillColor: [0, 90, 160],
                        textColor: [255, 255, 255],
                        fontSize: 12,
                    },
                    bodyStyles: {
                        fillColor: [245, 245, 245],
                        fontSize: 11,
                    },
                    alternateRowStyles: {
                        fillColor: [255, 255, 255],
                    },
                });

                // Save the PDF
                doc.save('payment_receipt.pdf');

            } catch (error) {
                console.error('Error updating item status:', error);
            }
        }
    };

    const getImageUrl = (itemId) => {
        return `http://localhost:5000/api/items/${itemId}/image`;
    };

    const calculateTotalPrice = (priceOfItem, interest, duration) => {
        const monthlyInterest = (priceOfItem * interest) / 100;
        const totalInterest = monthlyInterest * duration;
        const totalPrice = priceOfItem + totalInterest;
        return totalPrice;
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'priceOfItem' || name === 'interest' || name === 'duration' ? parseFloat(value) || 0 : value;
    
        // Update selected item
        setSelectedItem(prev => {
            const updatedItem = { ...prev, [name]: updatedValue };
    
            // Recalculate total price
            const totalPrice = calculateTotalPrice(
                updatedItem.priceOfItem,
                updatedItem.interest,
                updatedItem.duration
            );
            return { ...updatedItem, totalPrice };
        });
    };    


    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SidebarAdmin/>
                <div className="col py-3 content-area">
                    <h1 className="text-center caption mb-4">Products Details</h1>

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                        <div className="input-group w-100 w-md-50 mb-3 mb-md-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Name, NIC, or Item Name"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="ms-md-3 mt-3 mt-md-0 d-flex align-items-center">
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btnall btnToggle btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Toggle Columns
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                    {Object.keys(columnVisibility).map((column, index) => (
                                        <li key={index}>
                                            <input
                                                type="checkbox"
                                                name={column}
                                                checked={columnVisibility[column]}
                                                onChange={handleColumnToggle}
                                            />
                                            {` ${column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    {columnVisibility.id && <th>ID</th>}
                                    {columnVisibility.name && <th>Name</th>}
                                    {columnVisibility.nic && <th>NIC</th>}
                                    {columnVisibility.address && <th>Address</th>}
                                    {columnVisibility.phone && <th>Phone</th>}
                                    {columnVisibility.startDate && <th>Start Date</th>}
                                    {columnVisibility.category && <th>Item Category</th>}
                                    {columnVisibility.itemName && <th>Item Name</th>}
                                    {columnVisibility.priceOfItem && <th>Price of Item</th>}
                                    {columnVisibility.endDate && <th>End Date</th>}
                                    {columnVisibility.interest && <th>Interest %</th>}
                                    {columnVisibility.discount && <th>Discount</th>}
                                    {columnVisibility.totalPrice && <th>Total Price</th>}
                                    {columnVisibility.status && <th>Status</th>}
                                    {columnVisibility.actions && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item, index) => (
                                    <tr key={item._id}>
                                        {columnVisibility.id && <td>{index + 1}</td>}
                                        {columnVisibility.name && <td>{item.customerName}</td>}
                                        {columnVisibility.nic && <td>{item.nic}</td>}
                                        {columnVisibility.address && <td>{item.address}</td>}
                                        {columnVisibility.phone && <td>{item.phone}</td>}
                                        {columnVisibility.startDate && <td>{new Date(item.startDate).toLocaleDateString()}</td>}
                                        {columnVisibility.category && <td>{item.category}</td>}
                                        {columnVisibility.itemName && <td>{item.itemName}</td>}
                                        {columnVisibility.priceOfItem && <td>{item.priceOfItem}</td>}
                                        {columnVisibility.endDate && <td>{item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A'}</td>}
                                        {columnVisibility.interest && <td>{item.interest}</td>}
                                        {columnVisibility.discount && <td>{item.discount}</td>}
                                        {columnVisibility.totalPrice && <td>{item.totalPrice}</td>}

                                        {columnVisibility.status && (
                                            <td
                                                style={{
                                                    color: item.status === 'Payment Received' ? 'green' : 'red',
                                                    fontWeight: item.status === 'Payment Received' ? 'bold' : 'bold',
                                                }}
                                            >
                                                {item.status || 'Pending'}
                                            </td>
                                        )}

                                        {columnVisibility.actions && (
                                            <td>
                                                <button
                                                    className="btn btn-primary me-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#updateModal"
                                                    onClick={() => handleUpdate(item)}
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    className="btn btn-secondary disabled"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Update Modal */}
                    <div
                        className="modal fade"
                        id="updateModal"
                        tabIndex="-1"
                        aria-labelledby="updateModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateModalLabel">Update Item</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-2">
                                        {selectedItem && (
                                            <img
                                                src={getImageUrl(selectedItem._id)}
                                                alt="Item"
                                                className="img-fluid"
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        )}
                                    </div>
                                    {selectedItem && (
                                        <form>
                                            <div className="mb-2">
                                                <label className="form-label">Customer Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.customerName}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, customerName: e.target.value })}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">NIC</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.nic}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, nic: e.target.value })}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Address</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.address}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, address: e.target.value })}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Phone</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.phone}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, phone: e.target.value })}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Start Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.startDate.slice(0, 10)}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, startDate: e.target.value })}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Item Category</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.category}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Item Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.itemName}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, itemName: e.target.value })}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">End Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control form-control-sm"
                                                    value={selectedItem.endDate ? selectedItem.endDate.slice(0, 10) : ''}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, endDate: e.target.value })}
                                                />
                                            </div><div className="mb-2">
                                                <label className="form-label">Price of Item</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    name="priceOfItem"
                                                    value={selectedItem.priceOfItem}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Interest (%)</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    name="interest"
                                                    value={selectedItem.interest}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label">Duration (Months)</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    name="duration"
                                                    value={selectedItem.duration || ''}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* <div className="mb-2">
                                                <label className="form-label">Discount</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    name="discount"
                                                    value={selectedItem.discount}
                                                    onChange={handleChange}
                                                />
                                            </div> */}
                                            <div className="mb-2">
                                                <label className="form-label">Total Price</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm"
                                                    name="totalPrice"
                                                    value={selectedItem.totalPrice}
                                                    onChange={handleChange}
                                                    readOnly
                                                />
                                            </div>
                                        </form>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSaveChanges}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={handlePaymentReceived}
                                    >
                                        Payment Received
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsAdmin;
