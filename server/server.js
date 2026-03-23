require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const seedAdmin = require('./utils/seedAdmin');

const app = express();

/**
 * ✅ Allow ALL origins (no restriction)
 */
app.use(cors());

/**
 * ✅ Middleware
 */
app.use(express.json());

/**
 * ✅ Routes
 */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

/**
 * ✅ Health Check Route
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

/**
 * ✅ Connect DB and Start Server
 */
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Seed admin user (only runs if not exists)
    await seedAdmin();

    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('DB connection error:', err));