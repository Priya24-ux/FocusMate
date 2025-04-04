
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');

// // Load environment variables
// dotenv.config();

// // Initialize express
// const app = express();

// // Middleware for parsing JSON requests and enabling CORS
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error: ', err));

// // Import authentication routes
// const authRoutes = require('./routes/auth');

// // Use the authentication routes
// app.use('/api/auth', authRoutes);

// // Setup the server to listen on the specified port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));











// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const taskRoutes = require('./routes/tasks'); // Import tasks route
// app.use('/api/tasks', taskRoutes); // Use it in the app


// // Load environment variables
// dotenv.config();

// // Initialize express
// const app = express();

// // Middleware for parsing JSON requests and enabling CORS
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/todoapp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// // Import authentication routes
// const authRoutes = require('./routes/auth');

// // Use the authentication routes
// app.use('/api/auth', authRoutes);

// // Setup the server to listen on the specified port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));




const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware for parsing JSON requests and enabling CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Import routes (This should be AFTER `app` is declared)
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks'); // Make sure this file exists

// Use the authentication and task routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Now app is declared before this

// Setup the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
