import React from 'react';
import Sidebar from '../../components/Sidebar';
import './Dashboard.css';

const Interest = () => {
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <Sidebar />

                <div className="col py-3 content-area">
                    <h1 className="text-center mb-4">Calculate Interest</h1>
                   
                   <br/>

                    <form className="space-y-4">

                        <div className="form-group">
                            <label class="mr-2 font-semibold text-muted-foreground" for="interest">Interest %:</label>
                            <input type="text" id="username" className="form-control" placeholder="Enter Rate %" />
                        </div>

                        <br/>

                        {/* <div className="form-group">
                                        <label htmlFor="email" className="form-label font-weight-bold">Email</label>
                                        <input type="email" id="email" className="form-control" placeholder="Enter email" />
                                    </div> */}
                        <div className="form-group">
                            <label class="block mb-1 font-semibold text-muted-foreground" for="requested-price">Price Of Item:</label>
                            <input type="text" id="password" className="form-control" placeholder="Enter Price of Item" />
                        </div>

                        <br/>


                        <div className="form-group">
                            <label class="block mb-1 font-semibold text-muted-foreground" for="duration">Duration (Months):</label>
                            <input type="text" id="duration" className="form-control" placeholder="Enter duration" />
                        </div>

                        <br/>


                        <div className="form-group">
                            <div class="block mb-1 font-semibold text-muted-foreground">Total Price Today:</div>
                            <div
                                id="total-price"
                                class="bg-input p-2 rounded-lg border border-zinc-400 dark:border-white dark:bg-secondary dark:text-secondary-foreground w-full flex items-center justify-between transition-shadow duration-300"
                            >
                                Calculate
                            </div>
                        </div>

                        <br/>

                        
                        <div className="d-flex justify-content-between mt-4">
                            <button type="button" className="btn btn-danger">Reset</button>
                            <button type="submit" className="btn btn-success">Calculate</button>
                        </div>
                    </form>

                </div>
            </div></div>
    );
};

export default Interest;
