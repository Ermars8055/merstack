const express = require('express');
const cors = require('cors');
const app = express();

const UserModel = require('./User');
const ProductModel = require('./Products');
const LoginModel = require('./login');
const ClientModel = require('./Client');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Company')
.then(() => console.log('DB connected'))
.catch(err => console.log(err));

// Create Product
app.post('/addProduct', async (req,res)=> {
    try {
        await ProductModel.create(req.body)
        res.json({message:'Product Added Successfully'})
    }
    catch(error) {
        res.json(error)
    }
})

// View Products
app.get('/viewProducts', async (req,res) => {
    try {
        const records = await ProductModel.find()
        res.json(records)
    }
    catch(error) {
        res.json(error)
    }
})

// Find Product by ID
app.get('/findProduct/:id', async (req, res) => {
    try {
        const record = await ProductModel.findById(req.params.id);
        res.json(record);
    } catch (error) {
        res.json(error);
    }
})

// Update Product
app.put('/editProduct/:id', async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        if (!updatedProduct) {
            return res.send('Item not found');
        }
        res.json({ message: 'Product Updated Successfully' });
    } catch (err) {
        res.json(err);
    }
})

// Delete Product
app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const deletedItem = await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item Deleted Successfully!' });
    } catch (error) {
        res.json(error);
    }
})

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, location, password } = req.body;
    console.log("Incoming Register Data:", req.body);

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name,
      email,
      phone,
      location,
      password: hashedPassword
    });

    console.log("User Created Successfully");
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", req.body);

    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("User  found");
      return res.json({ error: 'User found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.json({ error: 'Invalid credentials' });
    }

    const loginEntry = await LoginModel.create({ email });
    console.log("Login saved to DB:", loginEntry);

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Client Registration
app.post('/clientRegister', async (req, res) => {
  try {
    const { name, email, phone, city, password } = req.body;

    const existingClient = await ClientModel.findOne({ email });
    if (existingClient) return res.json({ error: 'Client already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await ClientModel.create({
      name,
      email,
      phone,
      city,
      password: hashedPassword
    });

    res.json({ message: 'Client registered successfully' });
  } catch (err) {
    console.error("Client registration error:", err);
    res.status(500).json({ error: 'Client registration failed' });
  }
});

// Client Login
app.post('/clientLogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔍 Client login attempt:", email);

    const client = await ClientModel.findOne({ email });
    console.log("🔍 Client found:", client);

    if (!client) return res.json({ error: 'Client  found' });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) return res.json({ error: 'Invalid credentials' });

    res.json({ message: 'Client login successful' });
  } catch (err) {
    console.error("Client login error:", err);
    res.status(500).json({ error: 'Client login failed' });
  }
});

// Root route
app.get('/', (req,res) => {
    res.send('Welcome LAB MERN STACK FULL STACK')
})

// Server port
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
