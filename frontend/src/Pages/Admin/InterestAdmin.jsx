import React from 'react';
import './Interest.css'
import { useState } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';

const InterestAdmin = () => {
    const [duration, setDuration] = useState('');
    const [monthlyInterestRate, setMonthlyInterestRate] = useState('15');
    const [amountReq, setAmount] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [monthlyInterest, setMonthlyInterest]=useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [error, setError] = useState('')

    const calculater = () => {
        setError('');
        const durationMonths = parseFloat(duration);
        const rate = parseFloat(monthlyInterestRate) / 100;
        const amount = parseFloat(amountReq);

        if (isNaN(durationMonths) || durationMonths <= 0 || isNaN(rate) || rate <= 0 || isNaN(amountReq) || amountReq <= 0) {
            setError('Please Enter Valid Value');
            return
        }

        const numerator = rate * Math.pow(1 + rate, durationMonths);
        const denominator = Math.pow(1 + rate, durationMonths) - 1;

        const interest = amount * (numerator / denominator);
        const total = interest * durationMonths;
        const totalInterest = total - amount;
        const monthlyInterest=  totalInterest/durationMonths;

        setMonthlyPayment(interest.toFixed(0));
        setMonthlyInterest(monthlyInterest.toFixed(0));
        setTotalPayment(total.toFixed(0));
        setTotalInterest(totalInterest.toFixed(0));
    }

    const resetBtn = () => {
        setMonthlyInterestRate("15");
        setAmount("");
        setDuration("");
        setMonthlyPayment(null);
        setMonthlyInterest(null)
        setTotalInterest(null);
        setTotalPayment(null);
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SidebarAdmin />

                <div className="col py-3 content-area">
                    <h1 className="caption">Calculate Interest</h1>

                    <form className="space-y-4">
                        <div className="form-group">
                            <input
                                type="number"
                                step="0.01"
                                value={monthlyInterestRate}
                                onChange={(e) => setMonthlyInterestRate(e.target.value)}
                                className="form-control"
                                placeholder='Enter Interest %'
                            />
                            <label className="">Interest %</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="number"
                                step="0.01"
                                value={amountReq}
                                onChange={(e) => setAmount(e.target.value)}
                                className="form-control"
                                placeholder='Enter item amount'
                            />
                            <label className="">Price Of Item</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                id="duration"
                                className="form-control"
                                placeholder='Enter duration (months)'
                            />
                            <label className="">Duration (Months)</label>
                        </div>
                    </form>

                    <div className="calculater-right">
                        <div className="output">
                            <div className="output-text">
                                <p>Monthly Interst: {monthlyInterest !== null && (<span> Rs.{monthlyInterest}</span>)}</p>
                            </div>
                            <div className="output-text">
                                <p>Monthly payment: {monthlyPayment !== null && (<span> Rs.{monthlyPayment}</span>)}</p>
                            </div>
                            <div className="output-text">
                                <p>Total Interest Paid:
                                    {monthlyPayment !== null && (<span> Rs. {totalInterest}</span>)}</p>
                            </div>
                            <div className="output-text">
                                <p>Total Payment:
                                    {monthlyPayment !== null && (<span> Rs. {totalPayment}</span>)}</p>
                            </div>
                            <div className="error">
                                <p>{error && <p>{error}</p>}</p>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <button type="button" className='btnSave btnall' onClick={calculater}>Calculate</button>{' '}
                        <button type="button" className='btnReset btnall' onClick={resetBtn}>Reset</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InterestAdmin;
