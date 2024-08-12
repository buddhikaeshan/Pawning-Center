const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthController = require('./controllers/auth/auth')
const PasswordRecoveryController= require('./controllers/auth/Password_recovery')

const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://maleeshapathirana1:1olmMIHQ8xojExRJ@cluster0.yeh5r.mongodb.net/mydatabase')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

    // Auth Routes
    app.post('/login',AuthController.login);
    app.post('/verify', AuthController.verifyEmail);
    app.post('/change_name', AuthController.changeName);
    app.post('/resend_otp', AuthController.resendOTP);
    app.post('/social_sign', AuthController.socialSingIn);
    app.post('/get_user', AuthController.getUser);
    app.post('/change_name', AuthController.changeName);


    // Password recovery routes
    app.post('/send_recovery_otp', PasswordRecoveryController.sendRecoveryOTP);
    app.post('/resend_recovery_otp', PasswordRecoveryController.resendOTP);
    app.post('/verify_recovery_otp', PasswordRecoveryController.verifyOTP);
    app.post('/change_password', PasswordRecoveryController.changePassword);


const customerSchema = new mongoose.Schema({
    customerName: String,
    nic: String,
    address: String,
    phone: String,
});

const itemSchema = new mongoose.Schema({
    customerName: String,
    nic: String,
    address: String,
    phone: String,
    startDate: Date,
    category: String,
    itemName: String,
    priceOfItem: Number,
    endDate: Date,
    interest: Number,
    discount: Number,
    totalPrice: Number,
    status: String,
});

const Customer = mongoose.model('Customer', customerSchema);
const Item = mongoose.model('Item', itemSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle form submission
app.post('/api/submit', async (req, res) => {
    const {
        customerName,
        nic,
        address,
        phone,
        startDate,
        category,
        itemName,
        priceOfItem,
    } = req.body;

    try {
        // Check if customer exists
        let customer = await Customer.findOne({ nic });

        if (!customer) {
            // Create new customer
            customer = new Customer({ customerName, nic, address, phone });
            await customer.save();
        }

        // Save item details
        const item = new Item({
            customerName,
            nic,
            address,
            phone,
            startDate,
            category,
            itemName,
            priceOfItem,
        });

        await item.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data' });
    }
});



// API endpoint to get all customers
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Error fetching customers' });
    }
});

// API endpoint to get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Error fetching items' });
    }
});


const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

// Route to create a new admin
app.post('/api/admins', async (req, res) => {
    const { username, password, accountType } = req.body;

    if (!username || !password || !accountType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newAdmin = new Admin({
            username,
            password, // In a real application, you should hash the password before saving it
            accountType,
        });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create admin', error: err.message });
    }
});

// Route to delete a customer by ID
app.delete('/api/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Customer.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Failed to delete customer' });
    }
});

// Route to delete an item by ID
app.delete('/api/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Item.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Failed to delete item' });
    }
});


// Update customer endpoint
app.put('/api/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { customerName, nic, address, phone } = req.body;

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { customerName, nic, address, phone },
            { new: true } // Return the updated document
        );
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Error updating customer' });
    }
});


// Update item endpoint
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Return the updated document
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item' });
    }
});