import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Products = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [columnVisibility, setColumnVisibility] = useState({
        id: false,
        name: false,
        nic: true,
        address: false,
        phone: false,
        startDate: true,
        category: true,
        itemName: true,
        priceOfItem: true,
        endDate: true,
        interest: true,
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

    // Handle column visibility change
    const handleColumnToggle = (event) => {
        const { name, checked } = event.target;
        setColumnVisibility((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    // Handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Filter items based on search query
    const filteredItems = items.filter((item) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            item.customerName.toLowerCase().includes(lowerCaseQuery) ||
            item.nic.toLowerCase().includes(lowerCaseQuery) ||
            item.itemName.toLowerCase().includes(lowerCaseQuery)
        );
    });

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="col py-3 content-area">
                    <h1 className="text-center mb-4">Products Details</h1>

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
                                    className="btn btn-secondary dropdown-toggle"
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
                                    {columnVisibility.id && <th>id</th>}
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
                                        {columnVisibility.status && <td>{item.status}</td>}
                                        {columnVisibility.actions && (
                                            <td>
                                                <button className="btn btn-primary btn-sm me-2">Update</button>
                                                <button className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        )}
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

export default Products;
