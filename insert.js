const mongoose = require('mongoose');
const dbConfig = require('./config/db.config'); // Update with your db.config.js path
const User = require('./models/user.model'); // Update with your user model path

mongoose
  .connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const sampleUsers = [
  {
    username: 'john_doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
  },
  {
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    phone: '9876543210',
  },
  {
    username: 'admin',
    email: 'admin@example.com',
    phone: '1122334455',
  },
];

User.insertMany(sampleUsers)
  .then(() => {
    console.log('Sample users inserted successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error inserting sample users:', err);
    mongoose.disconnect();
  });