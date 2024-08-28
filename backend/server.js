const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000', // Allow frontend origin
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Middleware
app.use(bodyParser.json({ limit: '10mb' })); // limit 
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const connection = mysql.createConnection({
    // host: 'sql.freedb.tech',
    // user: 'freedb_nmtest1',
    // password: 'UaDpRvJ?NeX96p9',
    // database: 'freedb_nmpawning'
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'freedb_nmpawning'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ 
    storage, 
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file to 10MB
});

//image uploads
app.post('/api/submit', upload.single('image'), (req, res) => {
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
    const image = req.file; 

    let imageData = null;
    if (image) {
        imageData = image.buffer; 
    }

    // Check if customer exists
    const checkCustomerQuery = 'SELECT * FROM Customers WHERE nic = ?';
    connection.query(checkCustomerQuery, [nic], (err, results) => {
        if (err) {
            console.error('Error checking customer:', err);
            return res.status(500).json({ message: 'Error checking customer' });
        }

        if (results.length === 0) {
            // Create new customer
            const createCustomerQuery = 'INSERT INTO Customers (customerName, nic, address, phone) VALUES (?, ?, ?, ?)';
            connection.query(createCustomerQuery, [customerName, nic, address, phone], (err) => {
                if (err) {
                    console.error('Error creating customer:', err);
                    return res.status(500).json({ message: 'Error creating customer' });
                }
            });
        }

        // Save item details
        const createItemQuery = 'INSERT INTO Items (customerName, nic, address, phone, startDate, category, itemName, priceOfItem, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(createItemQuery, [customerName, nic, address, phone, startDate, category, itemName, priceOfItem, imageData], (err) => {
            if (err) {
                console.error('Error saving item:', err);
                return res.status(500).json({ message: 'Error saving item' });
            }

            res.status(201).json({ message: 'Data saved successfully' });
        });
    });
});

// API to get all customers
app.get('/api/customers', (req, res) => {
    const getCustomersQuery = 'SELECT * FROM Customers';
    connection.query(getCustomersQuery, (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            return res.status(500).json({ message: 'Error fetching customers' });
        }

        res.status(200).json(results);
    });
});

// API to get all items
app.get('/api/items', (req, res) => {
    const getItemsQuery = 'SELECT * FROM Items';
    connection.query(getItemsQuery, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            return res.status(500).json({ message: 'Error fetching items' });
        }

        res.status(200).json(results);
    });
});

// API to get an item image
app.get('/api/items/:id/image', (req, res) => {
    const { id } = req.params;
    const getItemImageQuery = 'SELECT image FROM Items WHERE id = ?';
    connection.query(getItemImageQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching item image:', err);
            return res.status(500).json({ message: 'Error fetching item image' });
        }

        if (results.length === 0 || !results[0].image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.set('Content-Type', 'image/jpeg'); 
        res.send(results[0].image);
    });
});

//create a new admin
app.post('/api/admins', (req, res) => {
    const { username, password, accountType } = req.body;

    if (!username || !password || !accountType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const createAdminQuery = 'INSERT INTO admins (username, password, accountType) VALUES (?, ?, ?)';
    connection.query(createAdminQuery, [username, password, accountType], (err) => {
        if (err) {
            console.error('Error creating admin:', err);
            return res.status(500).json({ message: 'Failed to create admin' });
        }

        res.status(201).json({ message: 'Admin created successfully' });
    });
});

// Login 
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const getAdminQuery = 'SELECT * FROM admins WHERE username = ?';
    connection.query(getAdminQuery, [username], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length > 0 && results[0].password === password) {
            // Create JWT
            const token = jwt.sign({ id: results[0].id, accountType: results[0].accountType }, SECRET_KEY, { expiresIn: '1h' });

            // Set JWT as a cookie
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ accountType: results[0].accountType });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// Update customer 
app.put('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const { customerName, nic, address, phone } = req.body;

    const updateCustomerQuery = 'UPDATE Customers SET customerName = ?, nic = ?, address = ?, phone = ? WHERE id = ?';
    connection.query(updateCustomerQuery, [customerName, nic, address, phone, id], (err, results) => {
        if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).json({ message: 'Error updating customer' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully' });
    });
});

// Update item 
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Handle empty invalid datetime 
    if (updateData.endDate === '') {
        updateData.endDate = null; // Set to null if empty 
    }

    const updateItemQuery = 'UPDATE Items SET ? WHERE id = ?';
    connection.query(updateItemQuery, [updateData, id], (err, results) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ message: 'Error updating item' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item updated successfully' });
    });
});


// Delete customer 
app.delete('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    
   
    console.log('Received customer ID for deletion:', id);
    
    if (!id) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    const deleteCustomerQuery = 'DELETE FROM Customers WHERE id = ?';

    connection.query(deleteCustomerQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            return res.status(500).json({ message: 'Failed to delete customer' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
    });
});

// Delete item 
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;

    const deleteItemQuery = 'DELETE FROM Items WHERE id = ?';

    connection.query(deleteItemQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting item:', err);
            return res.status(500).json({ message: 'Failed to delete item' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    });
});


app.get('/api/items/report', (req, res) => {
    const { startDate, endDate } = req.query;
    const query = `
      SELECT id, customerName, nic, itemName, startDate, endDate, priceOfItem, totalPrice 
      FROM Items 
      WHERE status = 'Payment Received' AND startDate BETWEEN ? AND ?
    `;
  
    connection.query(query, [startDate, endDate], (err, results) => {
      if (err) {
        console.error('Error fetching report data:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results);
    });
  });

app.use('/images', express.static(path.join(__dirname, 'images')));


// Authentication middleware
const SECRET_KEY = 'NMSOLUTION';
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Protected route 
app.get('/api/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route!', accountType: req.user.accountType });
  });
  

// Logout route
app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
