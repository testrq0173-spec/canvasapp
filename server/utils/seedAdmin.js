const bcrypt = require('bcryptjs');
const User = require('../models/User');

const defaultAccounts = [
  { name: 'Admin',  email: 'admin@canvas.com',  password: 'admin123', role: 'admin' },
  { name: 'Staff',  email: 'staff@canvas.com',  password: 'staff123', role: 'staff' },
];

const seedAdmin = async () => {
  for (const account of defaultAccounts) {
    const exists = await User.findOne({ email: account.email });
    if (!exists) {
      const hashed = await bcrypt.hash(account.password, 10);
      await User.create({ ...account, password: hashed, isVerified: true });
      console.log(`Created default ${account.role}: ${account.email}`);
    } else {
      console.log(`${account.role} already exists, skipping.`);
    }
  }
};

module.exports = seedAdmin;
