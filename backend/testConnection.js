const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    mongoose.connection.close();  // Close the connection after testing
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
