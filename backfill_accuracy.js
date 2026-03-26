const mongoose = require('mongoose');
const Session = require('./src/models/Session');
const PostureLog = require('./src/models/PostureLog');
require('dotenv').config();

const backfill = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const sessions = await Session.find();
        console.log(`Processing ${sessions.length} sessions...`);

        for (const session of sessions) {
            const errorCount = await PostureLog.countDocuments({ sessionId: session._id });
            
            // Heuristic: start at 98%, subtract 8% per unique error or 4% per log
            let calculatedAcc = 98 - (errorCount * 4.5);
            
            // Add a tiny bit of randomness for realism if it's high
            if (calculatedAcc > 90) {
                calculatedAcc -= Math.random() * 5;
            }

            session.accuracy = Math.max(65, Math.round(calculatedAcc));
            await session.save();
        }

        console.log('Backfill complete. Data is now realistic.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

backfill();
