import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import './Products.css'

const Products = () => {
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
            try {
                await axios.put(`http://localhost:5000/api/items/${selectedItem._id}`, selectedItem);
                setItems(items.map(item => item._id === selectedItem._id ? selectedItem : item));
                setSelectedItem(null); // Close modal
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }
    };

    const handlePaymentReceived = async () => {
        if (selectedItem) {
            const updatedItem = { ...selectedItem, status: 'Payment Received' };
            try {
                await axios.put(`http://localhost:5000/api/items/${selectedItem._id}`, updatedItem);
                setItems(items.map(item => item._id === selectedItem._id ? updatedItem : item));
                setSelectedItem(null); // Close modal
            } catch (error) {
                console.error('Error updating item status:', error);
            }
        }
    };

    // Function to get the image URL
    const getImageUrl = (itemId) => {
        return `http://localhost:5000/api/items/${itemId}/image`;
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
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
                                                style={{ color: item.status === 'Payment Received' ? 'green' : 'inherit', fontWeight: item.status === 'Payment Received' ? 'bold' : 'normal' }}
                                            >
                                                {item.status}
                                            </td>
                                        )}
                                        {columnVisibility.actions && (
                                            <td>
                                                <button
                                                    className="btnUpdate btn-sm me-2"
                                                    onClick={() => handleUpdate(item)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#updateModal"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="btnDelete btn-danger btn-sm"
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
                </div>
            </div>

            {/* Update Modal */}
            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">Update Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">

                                {selectedItem && (
                                    <img
                                        src={getImageUrl(selectedItem._id)}
                                        alt="Item"
                                        className="img-fluid"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedItem?.customerName || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, customerName: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">NIC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedItem?.nic || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, nic: e.target.value })}
                                />
                            </div>  <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedItem?.address || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, address: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedItem?.phone || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, phone: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Item Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedItem?.category || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Item Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedItem?.itemName || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, itemName: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price of Item</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedItem?.priceOfItem || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, priceOfItem: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Interest %</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedItem?.interest || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, interest: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Discount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedItem?.discount || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, discount: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Total Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={selectedItem?.totalPrice || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, totalPrice: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedItem?.status || ''}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                                />
                            </div>
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
                                className="btn btn-success"
                                onClick={handlePaymentReceived}
                            >
                                Payment Received
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSaveChanges}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;