const express = require('express')
const cors = require('cors')
const app = express()


const UserModel = require('./User')
const ProductModel = require('./Products')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Company')
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

// create rest api
app.post('/addProduct', async (req,res)=> {
    try {
    await ProductModel.create(req.body)
    res.json({message:'Product Added Successfully'})
    }
    catch(error) {
    res.json(error)
    }
})

//read rest api
app.get('/viewProducts', async (req,res) => {
    try{
    const records = await ProductModel.find()
    res.json(records)
    }
    catch(error) {
    res.ison(error)
    }
})

//readproduct rest api
app.get('/findProduct/:id', async (req, res) => {
    try {
      const record = await ProductModel.findById(req.params.id);
      res.json(record);
    } catch (error) {
      res.json(error);
    }
  });

//update rest api
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
  });

//Delete - REST API
app.delete('/deleteProduct/:id', async (req, res) => {
    try {
      const deletedItem = await ProductModel.findByIdAndDelete({ id: req.params.id });
      res.json({ message: 'Item Deleted Successfully!' });
    } catch (error) {
      res.json(error);
    }
  });

app.post('/register',(req,res)=>{
    UserModel.create(req.body)
    .then(res.json('Data Saved Successfully'))
    .catch(err=>res.json(err))
    })

app.get('/',(req,res)=>{
    res.send('Welcome LAB MERN STACK FULL STACK')
})

const PORT = 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})