const mongoose = require('mongoose');
const Session = require('./src/models/Session');
require('dotenv').config();

const fixAccuracy = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const sessions = await Session.find({ accuracy: { $gt: 100 } });
        console.log(`Found ${sessions.length} sessions with accuracy > 100%. Fixing...`);

        for (let s of sessions) {
            s.accuracy = 100;
            await s.save();
        }

        console.log('Accuracy successfully bounded.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

fixAccuracy();
