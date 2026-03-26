require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/database');
let nodemailer;
try {
    nodemailer = require('nodemailer');
} catch (e) {
    console.warn('⚠️ Warning: nodemailer not found. Emails will be logged to console only.');
}
const crypto = require('crypto');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src/public'));

// --- Email Transporter Setup ---
// NOTE: Add EMAIL_USER and EMAIL_PASS to your .env to send real emails.
let transporter;
if (nodemailer) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

// Verification Email Template
const sendVerificationEmail = async (email, name, token) => {
    const url = `http://localhost:${PORT}/api/auth/verify/${token}`;
    const mailOptions = {
        from: `"Smart Fitness Gym" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Gym Membership!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #028090;">Welcome to the Gym, ${name}!</h2>
                <p>Thanks for joining our AI-powered fitness club. Before you can start your first workout, please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${url}" style="background-color: #02C39A; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Verify My Account</a>
                </div>
                <p style="color: #64748b; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #3b82f6;">${url}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                <p style="font-size: 12px; color: #94a3b8;">This is an automated message. Please do not reply.</p>
            </div>
        `
    };
    try {
        if (!process.env.EMAIL_USER || !transporter) {
            console.log('--- VERIFICATION LINK (MOCK MODE) ---');
            console.log(`To Verify ${name} (${email}), click here:`);
            console.log(url);
            console.log('------------------------------------');
            return;
        }
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (err) {
        console.error('Failed to send email:', err);
        console.log(`ACTVATION LINK FOR TEST: ${url}`);
    }
};

// Connect to Database
connectDB().catch(err => console.log('MongoDB connection failed'));
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Machine = require('./src/models/Machine');
const Session = require('./src/models/Session');
const PostureLog = require('./src/models/PostureLog'); 

const evaluationSchema = new mongoose.Schema({
  userId: String,
  timestamp: { type: Date, default: Date.now },
  responses: {
    easeOfUse: Number,
    poseAccuracy: Number,
    visualQuality: Number,
    dashboardUtility: Number,
    overallSatisfaction: Number
  },
  comments: String
});
const Evaluation = mongoose.model('Evaluation', evaluationSchema);

// --- Test endpoint to verify database connection ---
app.get('/api/test', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const machineCount = await Machine.countDocuments();
    const sessionCount = await Session.countDocuments();

    res.json({
      status: 'success',
      message: 'Database connected successfully!',
      data: {
        users: userCount,
        machines: machineCount,
        sessions: sessionCount
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// API Routes - Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ status: 'success', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// API Routes - Machines
app.get('/api/machines', async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json({ status: 'success', data: machines });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get single machine by machineId
app.get('/api/machines/:id', async (req, res) => {
  try {
    const machine = await Machine.findOne({ machineId: req.params.id });
    if (!machine) {
      return res.status(404).json({ status: 'error', message: 'Machine not found' });
    }
    res.json({ status: 'success', data: machine });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Start a new workout session
app.post('/api/sessions', async (req, res) => {
  try {
    const { userId, machineId, exerciseName } = req.body;

    // Find the machine document to get its ObjectId
    const machine = await Machine.findOne({ machineId: machineId });
    if (!machine) {
      return res.status(404).json({ status: 'error', message: 'Machine not found' });
    }

    // Find or create a default user for now (authentication comes later)
    let user = await User.findOne({ userId: userId || 'U001' });
    if (!user) {
      user = await User.findOne();
    }
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'No users found. Run seed.js first.' });
    }

    const session = new Session({
      sessionId: 'S' + Date.now(),
      userId: user._id,
      machineId: machine._id,
      startTime: new Date(),
      exerciseName: exerciseName || machine.name,
      status: 'active'
    });

    await session.save();

    res.status(201).json({
      status: 'success',
      message: 'Session started',
      data: {
        sessionId: session.sessionId,
        machine: machine.name,
        startTime: session.startTime
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Complete a workout session and save final stats
app.post('/api/sessions/:sessionId/complete', async (req, res) => {
  try {
    const { reps, duration, accuracy } = req.body;
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    
    if (!session) {
      return res.status(404).json({ status: 'error', message: 'Session not found' });
    }

    session.status = 'completed';
    session.repsCompleted = reps || 0;
    session.duration = duration || 0;
    session.accuracy = Math.min(100, Math.max(0, accuracy || 100));
    session.endTime = new Date();
    await session.save();

    res.json({ status: 'success', message: 'Session completed and saved' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// API Routes - Sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('userId', 'name email')
      .populate('machineId', 'name category');
    res.json({ status: 'success', data: sessions });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ── Posture Logs ─────────────────────────────────────────────────────────────

// Log a posture error for a session
app.post('/api/posture-logs', async (req, res) => {
  try {
    const { sessionId, errorType, severity, bodyPart, correctionGiven, poseData } = req.body;

    // Find the Session document so we can store its ObjectId
    const session = await Session.findOne({ sessionId: sessionId });
    if (!session) {
      return res.status(404).json({ status: 'error', message: 'Session not found' });
    }

    const postureLog = new PostureLog({
      sessionId:       session._id,
      errorType:       errorType,
      severity:        severity || 'medium',
      bodyPart:        bodyPart,
      correctionGiven: correctionGiven,
      wasCorreted:     false,
      poseData:        poseData
    });

    await postureLog.save();

    res.status(201).json({
      status:  'success',
      message: 'Posture error logged',
      data: {
        errorType: postureLog.errorType,
        timestamp: postureLog.timestamp
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get posture logs for a session (accepts either sessionId string or MongoDB _id)
app.get('/api/posture-logs/:sessionId', async (req, res) => {
  try {
    // Resolve the session first to get its _id
    const session = await Session.findOne({ sessionId: req.params.sessionId });
    if (!session) {
      return res.status(404).json({ status: 'error', message: 'Session not found' });
    }

    const logs = await PostureLog.find({ sessionId: session._id })
      .sort({ timestamp: -1 });

    res.json({ status: 'success', data: logs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ── Analytics Dashboard Endpoints ────────────────────────────────────────────

// Summary: top-level KPIs
app.get('/api/analytics/summary', async (req, res) => {
  try {
    const [totalSessions, totalErrors, totalUsers, machines] = await Promise.all([
      Session.countDocuments(),
      PostureLog.countDocuments(),
      User.countDocuments(),
      Machine.find({}, 'name _id')
    ]);

    // Most used machine
    const machineCounts = await Session.aggregate([
      { $group: { _id: '$machineId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    let mostUsedMachine = 'N/A';
    if (machineCounts.length > 0) {
      const m = await Machine.findById(machineCounts[0]._id, 'name');
      if (m) mostUsedMachine = m.name;
    }

    res.json({
      status: 'success',
      data: { totalSessions, totalErrors, totalUsers, mostUsedMachine }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Per-machine session counts + most common error
app.get('/api/analytics/machines', async (req, res) => {
  try {
    const machines = await Machine.find({}, 'machineId name category');

    const result = await Promise.all(machines.map(async (machine) => {
      const sessionCount = await Session.countDocuments({ machineId: machine._id });

      // Most common error type for sessions on this machine
      const sessions = await Session.find({ machineId: machine._id }, '_id');
      const sessionIds = sessions.map(s => s._id);

      const topError = await PostureLog.aggregate([
        { $match: { sessionId: { $in: sessionIds } } },
        { $group: { _id: '$errorType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ]);

      return {
        machineId:  machine.machineId,
        name:       machine.name,
        category:   machine.category,
        sessions:   sessionCount,
        topError:   topError.length > 0 ? topError[0]._id : 'none'
      };
    }));

    res.json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Posture error breakdown by type
app.get('/api/analytics/errors', async (req, res) => {
  try {
    const breakdown = await PostureLog.aggregate([
      {
        $group: {
          _id: '$errorType',
          total:  { $sum: 1 },
          high:   { $sum: { $cond: [{ $eq: ['$severity', 'high'] },   1, 0] } },
          medium: { $sum: { $cond: [{ $eq: ['$severity', 'medium'] }, 1, 0] } },
          low:    { $sum: { $cond: [{ $eq: ['$severity', 'low'] },    1, 0] } }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({ status: 'success', data: breakdown });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Recent sessions (last 20) with user + machine names and error counts
app.get('/api/analytics/recent-sessions', async (req, res) => {
  try {
    const sessions = await Session.find()
      .sort({ startTime: -1 })
      .limit(50) // Increased limit to filter and still have 20
      .populate('userId',   'name fitnessLevel')
      .populate('machineId', 'name category');

    const filtered = sessions.filter(s => s.userId !== null).slice(0, 20);

    const result = await Promise.all(filtered.map(async (s) => {
      const errorCount = await PostureLog.countDocuments({ sessionId: s._id });
      return {
        sessionId:    s.sessionId,
        user:         s.userId ? s.userId.name        : 'Unknown',
        fitnessLevel: s.userId ? s.userId.fitnessLevel : '—',
        machine:      s.machineId ? s.machineId.name  : 'Unknown',
        category:     s.machineId ? s.machineId.category : '—',
        startTime:    s.startTime,
        status:       s.status,
        repsCompleted: s.repsCompleted || 0,
        accuracy:     s.accuracy || 0,
        errorCount
      };
    }));

    res.json({ status: 'success', data: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ── User Dashboard Endpoints ───────────────────────────────────────────────

// --- Analytics Export (CSV) ---
app.get('/api/analytics/export', async (req, res) => {
    try {
        const sessions = await Session.find()
            .sort({ startTime: -1 })
            .limit(500)
            .populate('machineId');

        let csv = 'Date,Time,User,Machine,Reps,Accuracy(%),Duration(s)\n';
        
        sessions.forEach(s => {
            const dateStr = s.startTime ? new Date(s.startTime).toLocaleDateString() : 'N/A';
            const timeStr = s.startTime ? new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';
            const machineName = s.machineId ? s.machineId.name : 'Unknown';
            const accuracy = s.accuracy ? s.accuracy.toFixed(1) : 0;
            const duration = s.durationSec || 0;
            
            csv += `${dateStr},${timeStr},${s.userId},"${machineName}",${s.reps},${accuracy},${duration}\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=gym-report-' + new Date().toISOString().split('T')[0] + '.csv');
        res.send(csv);
    } catch (err) {
        res.status(500).json({ error: 'Export failed' });
    }
});

// --- Client & Trainer Management (Advanced Analytics) ---

// List all clients for a trainer
app.get('/api/clients', async (req, res) => {
    try {
        const clients = await User.find({ assignedTrainer: 'Eugene Mogare' })
            .sort({ lastActive: -1 });
        
        // Enrich with last workout date and session count
        const enriched = await Promise.all(clients.map(async (client) => {
            const lastSession = await Session.findOne({ userId: client._id }).sort({ startTime: -1 });
            const sessionCount = await Session.countDocuments({ userId: client._id });
            return {
                ...client.toObject(),
                lastWorkout: lastSession ? lastSession.startTime : null,
                totalSessions: sessionCount,
                inactivityDays: lastSession 
                    ? Math.floor((Date.now() - lastSession.startTime) / (1000 * 60 * 60 * 24)) 
                    : Math.floor((Date.now() - client.createdAt) / (1000 * 60 * 60 * 24))
            };
        }));

        res.json({ status: 'success', data: enriched });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Get specific client workout history
app.get('/api/clients/:id/workouts', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.id });
        if (!user) return res.status(404).json({ status: 'error', message: 'Client not found' });

        const sessions = await Session.find({ userId: user._id })
            .sort({ startTime: -1 })
            .populate('machineId', 'name category');
        
        res.json({ status: 'success', data: sessions });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Update trainer notes for a client
app.post('/api/clients/:id/notes', async (req, res) => {
    try {
        const { content } = req.body;
        const user = await User.findOneAndUpdate(
            { userId: req.params.id },
            { $push: { notes: { content, date: new Date(), trainer: 'Eugene Mogare' } } },
            { new: true }
        );
        res.json({ status: 'success', data: user.notes });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// --- Evaluation Questionnaire (Appendix II) ---
app.post('/api/evaluation/submit', async (req, res) => {
    try {
        const evaluation = new Evaluation(req.body);
        await evaluation.save();
        res.status(201).json({ status: 'success', message: 'Evaluation submitted' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Submission failed' });
    }
});

// --- Authentication (FR 3.3.1) ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, fitnessLevel } = req.body;
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ status: 'error', message: 'Email already registered' });

        // Generate simple ID and verification token
        const userId = 'U' + Math.floor(1000 + Math.random() * 9000);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        user = new User({ 
            userId, 
            name, 
            email, 
            password: req.body.password, 
            weight: req.body.weight,
            height: req.body.height,
            isVerified: false,
            verificationToken,
            loginCount: 0,
            fitnessGoals: req.body.fitnessGoals,
            fitnessLevel: fitnessLevel || 'Beginner' 
        });
        await user.save();

        // Send email
        sendVerificationEmail(email, name, verificationToken);

        res.status(201).json({ 
            status: 'success', 
            message: 'Email verification sent!',
            data: { userId, name, role: 'member', verificationRequired: true } 
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body; // Password ignored for this demo scope
        
        // Special case for Trainer: Eugene Mogare
        if (email === 'eugene@gym.com') {
            return res.json({ status: 'success', data: { userId: 'TRAINER', name: 'Eugene Mogare', role: 'trainer' } });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

        // Basic password check (assuming plain text as per current system, or hash later)
        if (user.password !== req.body.password) {
            return res.status(401).json({ status: 'error', message: 'Invalid password' });
        }

        // Verification check
        if (!user.isVerified) {
            return res.status(403).json({ 
                status: 'error', 
                message: 'Please verify your email address before logging in.',
                verificationPending: true 
            });
        }

        // Update login count and last active
        user.loginCount = (user.loginCount || 0) + 1;
        user.lastActive = new Date();
        await user.save();

        res.json({ status: 'success', data: { 
            userId: user.userId, 
            name: user.name, 
            role: 'member',
            loginCount: user.loginCount 
        } });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

// Get user profile (using userId string)
app.get('/api/auth/verify/:token', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
        { verificationToken: req.params.token },
        { isVerified: true, verificationToken: null },
        { new: true }
    );

    if (!user) {
        return res.send(`
            <div style="text-align:center; padding:50px; font-family: sans-serif;">
                <h2 style="color:#ef4444;">⚠ Link Expired or Invalid</h2>
                <p>We couldn't verify your account. Try registering again or contact support.</p>
                <br><a href="/login.html">Back to Login</a>
            </div>
        `);
    }

    // Redirect to a simple success page or login
    res.send(`
        <div style="text-align:center; padding:50px; font-family: sans-serif;">
            <h2 style="color:#02C39A;">🎉 Email Verified Successfully!</h2>
            <p>Welcome to the gym, ${user.name}! You can now log in to your account.</p>
            <br><a href="/login.html" style="background:#02C39A; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Go to Login</a>
        </div>
    `);
  } catch (err) {
    res.status(500).send('Server error during verification');
  }
});

// --- User Profiles ---
// Get user profile (using userId string)
app.get('/api/users/:userId/profile', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'success', data: user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Aggregate user stats: reps, accuracy, trend, errors
app.get('/api/users/:userId/stats', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    const sessions = await Session.find({ userId: user._id })
      .sort({ startTime: -1 })
      .populate('machineId', 'name');

    if (sessions.length === 0) {
      return res.json({
        status: 'success',
        data: { totalReps: 0, totalSessions: 0, avgAccuracy: 0, trend: [], topErrors: [] }
      });
    }

    const totalReps = sessions.reduce((acc, s) => acc + (s.repsCompleted || 0), 0);
    const totalSessions = sessions.length;

    // Calculate accuracy for each session (requires PostureLog join)
    const sessionDetails = await Promise.all(sessions.map(async (s) => {
      const errorCount = await PostureLog.countDocuments({ sessionId: s._id });
      // We don't have total frame count in Session, but we can approximate accuracy
      // based on duration and errorCount, or just use the good/total frame count if we had it.
      // Since we don't store good/total frames in Session model yet (only in UI),
      // we'll assume a "perfect" session has 0 errors.
      // Let's refine the accuracy logic for the dashboard.
      const durationSeconds = s.duration || 1;
      const expectedGoodFrames = durationSeconds * 2; // Assuming 2 analysis frames per second
      const estimatedAccuracy = Math.max(0, Math.min(100, 100 - (errorCount * 10))); // Simple heuristic

      return {
        id: s.sessionId,
        date: s.startTime,
        machine: s.machineId ? s.machineId.name : 'Unknown',
        reps: s.repsCompleted,
        accuracy: estimatedAccuracy
      };
    }));

    const avgAccuracy = Math.round(sessionDetails.reduce((acc, s) => acc + s.accuracy, 0) / totalSessions);

    // Top errors for this user
    const sessionIds = sessions.map(s => s._id);
    const topErrors = await PostureLog.aggregate([
      { $match: { sessionId: { $in: sessionIds } } },
      { $group: { _id: '$errorType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    res.json({
      status: 'success',
      data: {
        totalReps,
        totalSessions,
        avgAccuracy,
        history: sessionDetails.slice(0, 10), // last 10
        topErrors: topErrors.map(e => ({ type: e._id, count: e.count }))
      }
    });

  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Test the API at http://localhost:${PORT}/api/test`);
});
