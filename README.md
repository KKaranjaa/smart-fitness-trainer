# 🏋️ Smart Fitness Trainer - Setup Guide

**Project by:** Eugene Mogare  
**Course:** B.Sc. Computer Science  
**Institution:** University of Embu

---

## 📋 What You Have So Far

Your project structure is ready with:
- ✅ Database models (User, Machine, Session, PostureLog)
- ✅ Express server with basic API endpoints
- ✅ MongoDB connection configuration
- ✅ Project structure organized

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all the packages needed (Express, Mongoose, etc.)

---

### Step 2: Set Up MongoDB Atlas (Cloud Database)

#### A. Create a Free Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email (it's free!)
3. Choose the **FREE tier** (M0 Sandbox)

#### B. Create a Cluster
1. After signing in, click **"Build a Database"**
2. Choose **FREE** tier (M0)
3. Select a region close to Kenya (like **Frankfurt** or **Mumbai**)
4. Click **"Create Cluster"** (takes 3-5 minutes)

#### C. Create Database User
1. Click **"Database Access"** in the left menu
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `eugeneadmin` (or whatever you want)
5. Password: Create a strong password (save it somewhere!)
6. User Privileges: **Read and write to any database**
7. Click **"Add User"**

#### D. Allow Network Access
1. Click **"Network Access"** in the left menu
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

#### E. Get Your Connection String
1. Go back to **"Database"** (left menu)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://eugeneadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT:** Replace `<password>` with your actual password!

---

### Step 3: Configure Your Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your connection string:
   ```
   MONGODB_URI=mongodb+srv://eugeneadmin:YourPassword@cluster0.xxxxx.mongodb.net/smart-fitness-trainer?retryWrites=true&w=majority
   PORT=3000
   ```

**Make sure to:**
- Replace `<password>` with your actual password
- Add `/smart-fitness-trainer` before the `?` to name your database

---

### Step 4: Test Your Setup

Run the server:
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
📊 Database: smart-fitness-trainer
🚀 Server running on http://localhost:3000
```

---

### Step 5: Test the API

Open your browser and go to:
- **http://localhost:3000** - See the welcome page
- **http://localhost:3000/api/test** - Test database connection

You should see:
```json
{
  "status": "success",
  "message": "Database connected successfully!",
  "data": {
    "users": 0,
    "machines": 0,
    "sessions": 0
  }
}
```

---

## 📁 Project Structure

```
smart-fitness-trainer/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env                      # Your secret config (DON'T share this!)
├── .env.example              # Template for .env
└── src/
    ├── config/
    │   └── database.js       # Database connection
    ├── models/
    │   ├── User.js           # User schema
    │   ├── Machine.js        # Machine schema
    │   ├── Session.js        # Session tracking schema
    │   └── PostureLog.js     # Posture error logging
    ├── public/               # Static files (HTML, CSS, JS)
    └── views/                # Templates (if needed)
```

---

## 🧪 Testing Your Database

### Create a Test User

Use Postman, Thunder Client (VS Code), or curl:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "U001",
    "name": "Eugene Mogare",
    "email": "eugene@example.com",
    "fitnessLevel": "Intermediate",
    "age": 22
  }'
```

### Get All Users

```bash
curl http://localhost:3000/api/users
```

---

## 🎯 Next Steps - Build Your Features

### 1. QR Code Generation
- Create QR codes for each machine
- Store them in the Machine model

### 2. AR Interface (Front-End)
- Create HTML page with AR.js
- Scan QR → Load machine info
- Display AR exercise demo

### 3. Pose Detection
- Integrate TensorFlow.js with MoveNet
- Detect body keypoints in real-time
- Compare against correct form

### 4. Analytics Dashboard
- Create trainer dashboard
- Show machine usage stats
- Display posture error trends

---

## 📚 Useful Commands

```bash
# Start server (basic)
npm start

# Start with auto-restart (install nodemon first)
npm run dev

# Install a new package
npm install package-name

# Check if Node.js is installed
node --version
```

---

## ❓ Troubleshooting

### "Cannot connect to MongoDB"
- Check your internet connection
- Verify the connection string in `.env`
- Make sure you replaced `<password>` with your actual password
- Check if IP address is whitelisted in MongoDB Atlas

### "Port 3000 already in use"
- Change `PORT=3000` to `PORT=3001` in `.env`
- Or stop the other app using port 3000

### "Module not found"
- Run `npm install` again
- Delete `node_modules` folder and run `npm install`

---

## 📞 Need Help?

If you get stuck:
1. Check the error message carefully
2. Google the error (Stack Overflow is your friend!)
3. Check MongoDB Atlas dashboard to see if data is being saved
4. Use console.log() to debug

---

**Good luck with your final year project! 🎓**
