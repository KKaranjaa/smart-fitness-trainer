const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const deleteUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const res = await User.deleteMany({ email: { $ne: 'eugene@gym.com' } });
        console.log(`Deleted ${res.deletedCount} users.`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

deleteUsers();
