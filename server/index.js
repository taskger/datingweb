require('dotenv').config();

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const cors = require('cors');

const uri = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json())
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization
    res.json('Server Work!!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/user/:email', async (req, res) => {
  try {
    const {params} = req
    const users = await User.findOne({email: params.email});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/setting/:id', async (req, res) => {
  try {
    const { id } = req.params
    const  payload  = req.body
    if (id){
      await User.updateOne({_id: id}, {$set: payload});
      res.status(200).json({ status : 200});    
    }else{
      return res.status(401).json({ status : 401});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const payload = req.body
    const { id } = req.params
    const userRequestUpdate = await User.findOne({ _id: id });
    const userToUpdate = await User.findOne({ _id: payload._id });
    if (!userRequestUpdate) return res.status(401).json({ error: 'Unauthorized user' });
    if (userRequestUpdate.id == userToUpdate.id || userRequestUpdate.role == 'admin'){
      await User.updateOne({_id: payload._id}, {$set: payload});
      res.status(200).json({ status : 200});    
    }else{
      return res.status(401).json({ status : 401});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/heart/:id', async (req, res) => {
  try {
    const { id } = req.params
    const payload = req.body
    const likeUser = await User.findOne({ _id: id });
    const userRequest = await User.findOne({ _id:payload.id });
    if (!userRequest) return res.status(401).json({ error: 'Unauthorized user' });
    const checkHaveLike = likeUser.profile.like.includes(userRequest.id)
    if (!checkHaveLike){
      await User.updateOne({_id: id}, {$push: {"profile.like":userRequest.id}});
      res.status(200).json({ status : 200});    
    }else{
      await User.updateOne({_id: id}, {$pull: {"profile.like":userRequest.id}});
      return res.status(409).json({ status : 409});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/delete/:id', async (req, res) => {
  try{
    const { id } = req.params
    const  payload  = req.body
    const userRequestDelete = await User.findOne({ _id: id });
    const isAdmin = userRequestDelete.role == 'admin'
    if (isAdmin && id != payload._id) {
      await User.deleteOne({_id: payload._id})
      res.status(200).json({status:200})
    }else if(id == payload._id){
      res.status(403).json({status:403})
    }else{
      res.status(401).json({status:401})
    }
  }catch{
    res.status(500).json({ error: error.message });
  }
})
app.post('/create/:id', async (req, res) => {
  try{
    const { id } = req.params
    const payload = req.body
    const userRequestCreate = await User.findOne({ _id: id });
    const checkEmail = await User.findOne({email:payload.email})
    const isAdmin = userRequestCreate.role == 'admin'
    if (checkEmail?.email) return res.status(400).json({status:400})
    if (isAdmin) {
      await User.create(payload)
      res.status(200).json({status:200})
    }else{
      res.status(401).json({status:401})
    }
  }catch{
    res.status(500).json({ error: error.message });
  }
})
app.post('/create', async (req, res) => {
  try{
    const payload = req.body
    const checkEmail = await User.findOne({email:payload.email})
    if (checkEmail?.email) return res.status(400).json({status:400})
    await User.create(payload)
    res.status(200).json({status:200})
  }catch{
    res.status(500).json({ error: error.message });
  }
})
app.listen(PORT, () => {
  console.log('Application is running on port 5000')
})