# Token of Thanks - Setup Guide

## 🚀 Quick Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Gmail account (for email notifications)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file with your configuration
# - MONGODB_URI: Your MongoDB Atlas connection string
# - JWT_SECRET: A secure random string
# - EMAIL_USER: Your Gmail address
# - EMAIL_PASS: Your Gmail app password

# Start the development server
npm run dev

# In a new terminal, seed the database with sample rewards
npm run seed
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### 3. Environment Configuration

#### Backend (.env file)
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/tokenofthanks?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

#### Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings → Security → 2-Step Verification → App passwords
3. Generate a password for "Mail"
4. Use this password in `EMAIL_PASS`

### 4. MongoDB Atlas Setup
1. Create a free MongoDB Atlas account
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Replace the placeholder in `MONGODB_URI`

### 5. Testing the Application

1. **Backend Health Check**: Visit `http://localhost:5000/api/health`
2. **Frontend**: Visit `http://localhost:3000`
3. **Register a new account**
4. **Test sending tokens** between users
5. **Test redeeming rewards**

### 6. Common Issues & Solutions

#### Backend Issues
- **MongoDB connection failed**: Check your connection string and network access
- **Email not sending**: Verify Gmail app password and 2FA settings
- **JWT errors**: Ensure JWT_SECRET is set and consistent

#### Frontend Issues
- **API connection failed**: Check backend URL and CORS settings
- **Authentication errors**: Verify JWT token handling
- **Styling issues**: Ensure Tailwind CSS is properly configured

### 7. Production Deployment

#### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

#### Frontend (Vercel)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Deploy automatically

### 8. Features to Test

- ✅ User registration and login
- ✅ Token balance display
- ✅ Sending tokens with messages
- ✅ Email notifications
- ✅ Rewards marketplace
- ✅ Transaction history
- ✅ Responsive design

### 9. File Structure
```
tokenofthanks/
├── backend/              # Node.js + Express API
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication middleware
│   ├── utils/           # Email utilities
│   ├── scripts/         # Database seeding
│   └── server.js        # Main server file
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   └── App.js       # Main app component
│   └── public/          # Static files
├── database/            # MongoDB schemas
│   └── models/          # Database models
└── README.md            # Project documentation
```

### 10. Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas is accessible
4. Check Gmail app password configuration

The application should now be fully functional with beautiful purple gradient design and all core features working! 🎉 