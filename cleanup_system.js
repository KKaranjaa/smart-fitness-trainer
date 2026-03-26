require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Session = require('./src/models/Session');
const connectDB = require('./src/config/database');

const cleanup = async () => {
    try {
        await connectDB();
        console.log('--- System Cleanup Started ---');

        // 1. Purge test users
        const testEmails = ['brian_verify@example.com', 'jane_verify@example.com', 'progress_test@test.com'];
        const testNames = ['Progress Tester', 'Verification Jane'];
        
        const deleteUsers = await User.deleteMany({
            $or: [
                { email: { $in: testEmails } },
                { name: { $in: testNames } }
            ]
        });
        console.log(`Removed ${deleteUsers.deletedCount} test users.`);

        // 2. Close zombie sessions (Active but older than 4 hours)
        const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);
        const updateSessions = await Session.updateMany(
            { status: 'active', startTime: { $lt: fourHoursAgo } },
            { $set: { status: 'abandoned', endTime: new Date() } }
        );
        console.log(`Closed ${updateSessions.modifiedCount} zombie sessions.`);

        console.log('--- Cleanup Complete ---');
        process.exit(0);
    } catch (err) {
        console.error('Cleanup failed:', err);
        process.exit(1);
    }
};

cleanup();
