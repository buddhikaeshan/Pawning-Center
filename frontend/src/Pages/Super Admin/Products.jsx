import React from 'react';
import Sidebar from '../../components/Sidebar';


const Products = () => {
    // JavaScript function to handle column toggling
    React.useEffect(() => {
        document.querySelectorAll('.column-toggle').forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                let colIndex = this.getAttribute('data-column');
                document.querySelectorAll('table tr th:nth-child(' + colIndex + '), table tr td:nth-child(' + colIndex + ')')
                    .forEach(cell => {
                        cell.style.display = this.checked ? '' : 'none';
                    });
            });
        });
    }, []);

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />
                <div className="col py-3 content-area">
                    <h1 className="text-center mb-4">Products Details</h1>

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                        <div className="input-group w-100 w-md-50 mb-3 mb-md-0">
                            <input type="text" className="form-control" placeholder="Search" />
                            <button className="btn btn-outline-secondary">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>

                        <div className="ms-md-3 mt-3 mt-md-0 d-flex align-items-center">
                            {/* <button className="btn btn-success btn-sm me-3">Add Products</button> */}

                            {/* Dropdown for column toggle */}
                            <div className="btn-group">
                                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Toggle Columns
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li><input type="checkbox" className="column-toggle" data-column="1" defaultChecked /> id</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="2" defaultChecked /> Name</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="3" defaultChecked /> NIC</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="4" defaultChecked /> Address</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="5" defaultChecked /> Phone</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="6" defaultChecked /> Start Date</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="7" defaultChecked /> Item Category</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="8" defaultChecked /> Item Name</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="9" defaultChecked /> Valued Price</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="10" defaultChecked /> Interest %</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="11" defaultChecked /> Discount</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="12" defaultChecked /> Total Price</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="13" defaultChecked /> Status</li>
                                    <li><input type="checkbox" className="column-toggle" data-column="14" defaultChecked /> Actions</li>
                                </ul>
                            </div>
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
                                    <th>Start Date</th>
                                    <th>Item Category</th>
                                    <th>Item Name</th>
                                    <th>Valued Price</th>
                                    <th>Interest %</th>
                                    <th>Discount</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
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
                                    <td>2024.08.01</td>
                                    <td>Phone</td>
                                    <td>galaxy</td>
                                    <td>50000</td>
                                    <td>10000</td>
                                    <td>5000</td>
                                    <td>55000</td>
                                    <td>Payment Done</td>
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

export default Products;
