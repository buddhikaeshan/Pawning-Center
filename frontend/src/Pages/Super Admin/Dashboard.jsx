import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Dashboard = () => {
    const [totalProfit, setTotalProfit] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/items');
                const paidItems = response.data.filter(item => item.status === 'Payment Received');

                const profit = paidItems.reduce((acc, item) => acc + item.totalPrice, 0);
                const revenue = paidItems.reduce((acc, item) => acc + item.priceOfItem, 0);

                setTotalProfit(profit);
                setTotalRevenue(revenue);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/customers');
                const customers = response.data;
    
                const uniqueCustomers = new Set(customers.map(item => item.customerName));
                setCustomerCount(uniqueCustomers.size);
    
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />

                <div className="col py-3 content-area">
                    <h3 className='caption'>Dashboard</h3>
                    <main className="col-md-12 p-3 bg-white">

                        <div className="row">
                            <div className="col-md-4">
                                <div className="stats-box">
                                    <h4>Total Revenue</h4>
                                    <p> ${totalRevenue}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="stats-box">
                                    <h4>Total Profit</h4>
                                    <p>${totalProfit}</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="stats-box">
                                    <h4>Customer Count</h4>
                                    <p> {customerCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink
                                    to="/Customers"
                                    className="p-3 tabs cusTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Customer Details
                                </NavLink>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink
                                    to="/Interest"
                                    className="p-3 tabs calTab  d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Calculate Interest
                                </NavLink>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink
                                    to="/Products"
                                    className="p-3 tabs addTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Add Products/Items
                                </NavLink>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink
                                    to="/CreateAdmin"
                                    className="p-3 tabs createAdTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Create Admins
                                </NavLink>
                            </div>
                            <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/Report" 
                                    className="p-3 tabs reportTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Monthly Report
                                </NavLink>
                            </div> 

                           {/*  <div className="col-md-4 mb-3" id="dMain">
                                <NavLink 
                                    to="/Settings" 
                                    className="p-3 tabs setTab d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    Account Settings
                                </NavLink>
                            </div>*/}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
