require('dotenv').config();
const mongoose = require('mongoose');
const QRCode = require('qrcode');

// Import models
const User = require('./src/models/User');
const Machine = require('./src/models/Machine');
const Session = require('./src/models/Session');
const PostureLog = require('./src/models/PostureLog');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Generate QR Code as text (for database storage)
async function generateQRCode(machineId) {
  try {
    const qrData = await QRCode.toDataURL(`MACHINE_${machineId}`);
    return qrData;
  } catch (error) {
    console.error('QR generation error:', error);
    return null;
  }
}

// Sample data
const sampleUsers = [
  {
    userId: 'U001',
    name: 'Eugene Mogare',
    email: 'eugene@embu.ac.ke',
    fitnessLevel: 'Intermediate',
    age: 22
  },
  {
    userId: 'U002',
    name: 'Jane Wanjiru',
    email: 'jane@embu.ac.ke',
    fitnessLevel: 'Beginner',
    age: 20
  },
  {
    userId: 'U003',
    name: 'John Kamau',
    email: 'john@embu.ac.ke',
    fitnessLevel: 'Advanced',
    age: 24
  },
  {
    userId: 'U004',
    name: 'Mary Njeri',
    email: 'mary@embu.ac.ke',
    fitnessLevel: 'Intermediate',
    age: 21
  }
];

const sampleMachines = [
  {
    machineId: 'M001',
    name: 'Treadmill',
    category: 'Cardio',
    instructions: 'Start slow, maintain upright posture, land mid-foot',
    targetMuscles: ['Legs', 'Cardiovascular'],
    safetyGuidelines: [
      'Start with warm-up speed',
      'Use safety clip',
      'Keep head up and shoulders back',
      'Never jump off while moving'
    ]
  },
  {
    machineId: 'M002',
    name: 'Leg Press Machine',
    category: 'Strength',
    instructions: 'Keep back flat against pad, push through heels, controlled motion',
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes'],
    safetyGuidelines: [
      'Keep knees aligned with toes',
      'Don\'t lock knees at top',
      'Control the weight on return',
      'Keep lower back pressed to pad'
    ]
  },
  {
    machineId: 'M003',
    name: 'Chest Press Machine',
    category: 'Strength',
    instructions: 'Sit upright, grip handles at chest height, push forward steadily',
    targetMuscles: ['Pectorals', 'Triceps', 'Shoulders'],
    safetyGuidelines: [
      'Adjust seat height properly',
      'Keep wrists straight',
      'Don\'t fully lock elbows',
      'Control return motion'
    ]
  },
  {
    machineId: 'M004',
    name: 'Lat Pulldown',
    category: 'Strength',
    instructions: 'Pull bar down to chest level, squeeze shoulder blades together',
    targetMuscles: ['Latissimus Dorsi', 'Biceps', 'Upper Back'],
    safetyGuidelines: [
      'Don\'t lean back excessively',
      'Keep core engaged',
      'Pull to upper chest, not behind neck',
      'Control the return phase'
    ]
  },
  {
    machineId: 'M005',
    name: 'Stationary Bike',
    category: 'Cardio',
    instructions: 'Adjust seat height, maintain steady cadence, keep shoulders relaxed',
    targetMuscles: ['Legs', 'Cardiovascular'],
    safetyGuidelines: [
      'Adjust seat so knee is slightly bent at bottom',
      'Keep feet secure in pedals',
      'Start with low resistance',
      'Maintain upright posture'
    ]
  }
];

// Seed function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Machine.deleteMany({});
    await Session.deleteMany({});
    await PostureLog.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert users
    console.log('👥 Creating users...');
    const users = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${users.length} users\n`);

    // Insert machines with QR codes
    console.log('🏋️  Creating machines...');
    for (let machine of sampleMachines) {
      const qrCode = await generateQRCode(machine.machineId);
      machine.qrCode = qrCode;
    }
    const machines = await Machine.insertMany(sampleMachines);
    console.log(`✅ Created ${machines.length} machines\n`);

    // Create sample sessions
    console.log('📊 Creating sample sessions...');
    const sampleSessions = [
      {
        sessionId: 'S001',
        userId: users[0]._id,
        machineId: machines[0]._id,
        startTime: new Date(Date.now() - 3600000), // 1 hour ago
        endTime: new Date(Date.now() - 1800000),   // 30 mins ago
        exerciseName: 'Running',
        repsCompleted: 1,
        status: 'completed'
      },
      {
        sessionId: 'S002',
        userId: users[1]._id,
        machineId: machines[1]._id,
        startTime: new Date(Date.now() - 7200000),
        endTime: new Date(Date.now() - 6300000),
        exerciseName: 'Leg Press',
        repsCompleted: 12,
        status: 'completed'
      },
      {
        sessionId: 'S003',
        userId: users[2]._id,
        machineId: machines[2]._id,
        startTime: new Date(Date.now() - 1800000),
        endTime: new Date(Date.now() - 900000),
        exerciseName: 'Chest Press',
        repsCompleted: 15,
        status: 'completed'
      }
    ];

    const sessions = await Session.insertMany(sampleSessions);
    console.log(`✅ Created ${sessions.length} sessions\n`);

    // Create sample posture logs
    console.log('📝 Creating posture logs...');
    const postureLogs = [
      {
        sessionId: sessions[0]._id,
        errorType: 'incorrect_back_angle',
        severity: 'medium',
        bodyPart: 'Back',
        correctionGiven: 'Keep your back straight and shoulders relaxed',
        wasCorreted: true
      },
      {
        sessionId: sessions[1]._id,
        errorType: 'knee_overextension',
        severity: 'high',
        bodyPart: 'Knees',
        correctionGiven: 'Don\'t lock your knees at the top',
        wasCorreted: true
      },
      {
        sessionId: sessions[2]._id,
        errorType: 'elbow_position',
        severity: 'low',
        bodyPart: 'Elbows',
        correctionGiven: 'Keep elbows slightly bent',
        wasCorreted: false
      }
    ];

    await PostureLog.insertMany(postureLogs);
    console.log(`✅ Created ${postureLogs.length} posture logs\n`);

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('🎉 DATABASE SEEDING COMPLETED!');
    console.log('═══════════════════════════════════════');
    console.log(`👥 Users: ${users.length}`);
    console.log(`🏋️  Machines: ${machines.length}`);
    console.log(`📊 Sessions: ${sessions.length}`);
    console.log(`📝 Posture Logs: ${postureLogs.length}`);
    console.log('═══════════════════════════════════════\n');

    console.log('💡 You can now:');
    console.log('   1. Visit http://localhost:3000/test.html');
    console.log('   2. Test the API endpoints');
    console.log('   3. Start building your AR features!\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  }
}

// Run the seeder
connectDB().then(() => {
  seedDatabase();
});
