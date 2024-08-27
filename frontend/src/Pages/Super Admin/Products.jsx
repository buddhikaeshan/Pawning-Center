import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import './Products.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Products = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

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


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredItems = items.filter((item) => {
        console.log('Item:', item); // Log the item
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            (item.customerName || '').toLowerCase().includes(lowerCaseQuery) ||
            (item.nic || '').toLowerCase().includes(lowerCaseQuery) ||
            (item.itemName || '').toLowerCase().includes(lowerCaseQuery)
        );
    });


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                if (id === undefined || id === null) {
                    throw new Error('Invalid ID');
                }

                await axios.delete(`http://localhost:5000/api/items/${id}`);
                setItems(items.filter(item => item.id !== id)); // Update local state
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };


    const handleUpdate = (item) => {
        setSelectedItem(item);
    };

    const formatDateForDb = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 19).replace('T', ' '); // 'YYYY-MM-DD HH:MM:SS'
    };


    const handleSaveChanges = async () => {
        if (selectedItem) {
            const totalPrice = calculateTotalPrice(
                selectedItem.priceOfItem,
                selectedItem.interest,
                selectedItem.duration
            );
            const updatedItem = { ...selectedItem, totalPrice };

            try {
                const response = await axios.put(`http://localhost:5000/api/items/${updatedItem.id}`, updatedItem, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Item updated:', response.data);
                setItems(items.map(item => item.id === updatedItem.id ? response.data : item));
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
            const totalPrice = calculateTotalPrice(
                selectedItem.priceOfItem,
                selectedItem.interest,
                selectedItem.duration
            );
            const updatedItem = { ...selectedItem, status: 'Payment Received', totalPrice };

            try {
                await axios.put(`http://localhost:5000/api/items/${selectedItem.id}`, updatedItem);
                setItems(items.map(item => item.id === selectedItem.id ? updatedItem : item));
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

                doc.setFontSize(18);
                doc.text('Payment Receipt', 14, 22);

                doc.setFontSize(12);
                doc.text(`Date: ${date}`, 14, 30);

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
                        ['Duration', selectedItem.duration],
                        ['Price of Item', selectedItem.priceOfItem],
                        ['Interest %', selectedItem.interest],
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
        if (!interest || !duration) {
            return ''; 
        }
    
        const monthlyInterest = ((priceOfItem * interest) / 100);
        const totalInterest = (monthlyInterest * duration);
        const totalPrice = (priceOfItem + totalInterest);
    
        return totalPrice;
    };
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'priceOfItem' || name === 'interest' || name === 'duration' ? parseFloat(value) || 0 : value;
    
        setSelectedItem(prev => {
            const updatedItem = { ...prev, [name]: updatedValue };
    
            if (name === 'duration' || name === 'startDate') {
                const startDate = updatedItem.startDate ? new Date(updatedItem.startDate) : null;
                const duration = updatedItem.duration ? parseInt(updatedItem.duration) : 0;
                if (startDate && duration) {
                    const endDate = new Date(startDate);
                    endDate.setMonth(endDate.getMonth() + duration);
                    updatedItem.endDate = endDate.toISOString().slice(0, 10);
                }
            }
    
            const totalPrice = calculateTotalPrice(
                updatedItem.priceOfItem,
                updatedItem.interest,
                updatedItem.duration
            );
            updatedItem.totalPrice = totalPrice;
    
            return updatedItem;
        });
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="col py-3 content-area">
                    <h1 className="text-center caption mb-4">Products Details</h1>

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                        <div className="input-group w-100 w-md-50 mb-3 mb-md-0">
                            <input type="text" className="form-control" placeholder="Search by Name, NIC, or Item Name"
                                value={searchQuery} onChange={handleSearchChange} />
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
                                    <th>Item Category</th>
                                    <th>Item Name</th>
                                    <th>Price of Item</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Interest %</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.customerName}</td>
                                        <td>{item.nic}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.category}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.priceOfItem}</td>
                                        <td>{new Date(item.startDate).toLocaleDateString()}</td>
                                        <td>{item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A'}</td>
                                        <td>{item.interest}</td>
                                        <td>{item.totalPrice}</td>

                                        <td
                                            style={{
                                                color: item.status === 'Payment Received' ? 'green' : 'red',
                                                fontWeight: item.status === 'Payment Received' ? 'bold' : 'bold',
                                            }}
                                        >
                                            {item.status || 'Pending'}
                                        </td>


                                        <td>

                                            <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => handleUpdate(item)} >
                                                Update
                                            </button>

                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)} >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Update Modal */}
                    <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true" >

                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateModalLabel">Update Item</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">
                                    {selectedItem && (
                                        <form>
                                            <div className="mb-2">
                                                <img src={getImageUrl(selectedItem.id)} alt="Item" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Customer Name</label>

                                                <input type="text" className="form-control form-control-sm" value={selectedItem.customerName}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, customerName: e.target.value })} />

                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">NIC</label>

                                                <input type="text" className="form-control form-control-sm" value={selectedItem.nic}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, nic: e.target.value })}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Address</label>

                                                <input type="text" className="form-control form-control-sm" value={selectedItem.address}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, address: e.target.value })} />

                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Phone</label>

                                                <input type="text" className="form-control form-control-sm" value={selectedItem.phone}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, phone: e.target.value })} />

                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Item Category</label>

                                                <input type="text" className="form-control form-control-sm" value={selectedItem.category}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Item Name</label>
                                                <input type="text" className="form-control form-control-sm"
                                                    value={selectedItem.itemName}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, itemName: e.target.value })} />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Start Date</label>
                                                <input type="date" className="form-control form-control-sm" value={selectedItem.startDate.slice(0, 10)}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, startDate: e.target.value })} />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">End Date</label>
                                                <input type="date" className="form-control form-control-sm"
                                                    value={selectedItem.endDate ? selectedItem.endDate.slice(0, 10) : ''}
                                                    onChange={(e) => setSelectedItem({ ...selectedItem, endDate: e.target.value })}  />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Price of Item</label>
                                                <input type="number" className="form-control form-control-sm" name="priceOfItem"
                                                    value={selectedItem.priceOfItem} onChange={handleChange} />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Interest (%)</label>
                                                <input type="number" className="form-control form-control-sm" name="interest"
                                                    value={selectedItem.interest} onChange={handleChange}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Duration (Months)</label>
                                                <input type="number" className="form-control form-control-sm" name="duration"
                                                    value={selectedItem.duration || ''} onChange={handleChange} />
                                            </div>

                                            <div className="mb-2">
                                                <label className="form-label">Total Price</label>
                                                <input type="number" className="form-control form-control-sm" name="totalPrice"
                                                    value={selectedItem.totalPrice} onChange={handleChange} readOnly />
                                            </div>

                                        </form>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" > Close </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSaveChanges} > Save Changes </button>
                                    <button type="button" className="btn btn-success" onClick={handlePaymentReceived} > Payment Received </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
