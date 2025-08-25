# Token of Thanks - Digital Gratitude Platform

A mesmerizing web application for sending digital tokens of appreciation with stunning visual effects, glass morphism, and animated gradients.

## ✨ Mesmerizing Features

### 🎨 Visual Design
- **Glass Morphism**: Beautiful translucent cards with backdrop blur effects
- **Animated Gradients**: Dynamic color transitions and flowing backgrounds
- **Particle Systems**: Floating particles and interactive background elements
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Stunning visuals on all devices

### 🌟 UI Components
- **Animated Buttons**: Hover effects, ripple animations, and loading states
- **Glass Cards**: Translucent cards with hover animations
- **Particles Background**: Interactive floating particles
- **Gradient Text**: Beautiful gradient text effects
- **Scroll Animations**: Elements animate as they come into view

### 🎯 Core Functionality
- **User Authentication**: Secure login/registration with JWT
- **Token Management**: Buy, send, and track digital tokens
- **Rewards System**: Redeem tokens for real rewards
- **Transaction History**: Complete audit trail of all activities
- **Email Notifications**: Beautiful email templates for token receipts

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and context
- **Framer Motion** - Smooth animations and transitions
- **React Spring** - Physics-based animations
- **Tailwind CSS** - Utility-first styling with custom animations
- **Lucide React** - Beautiful icon library
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Elegant notifications

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email sending
- **Express Validator** - Input validation

## 📁 Project Structure

```
tokenofthanks/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── AnimatedButton.js
│   │   │   ├── AnimatedGradient.js
│   │   │   ├── GlassCard.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── Navbar.js
│   │   │   └── ParticlesBackground.js
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json         # Frontend dependencies
├── backend/                  # Node.js backend application
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── utils/               # Utility functions
│   ├── scripts/             # Database scripts
│   └── package.json         # Backend dependencies
└── README.md               # Project documentation
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd tokenofthanks

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

```bash
# Backend environment
cd backend
cp env.example .env
# Edit .env with your configuration

# Frontend environment (optional for local development)
cd ../frontend
cp env.production .env.local
# Edit .env.local with your backend URL
```

### 3. Run the Application

```bash
# Terminal 1: Start Backend
cd backend
npm run dev

# Terminal 2: Start Frontend
cd frontend
npm start
```

## 🚀 Production Deployment

### Quick Deploy
```bash
# Build for production
chmod +x build-production.sh
./build-production.sh
```

### Platform-Specific Deployment
- **Frontend**: Deploy to [Vercel](https://vercel.com) for optimal performance
- **Backend**: Deploy to [Railway](https://railway.app) for auto-scaling
- **Database**: Use [MongoDB Atlas](https://mongodb.com/atlas) for managed database

📖 **Detailed deployment instructions**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

### 2. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/tokenofthanks
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Database Setup

```bash
# Navigate to backend directory
cd backend

# Seed the database with sample rewards
npm run seed
```

### 4. Start the Application

```bash
# Start backend server (in backend directory)
npm run dev

# Start frontend development server (in frontend directory, new terminal)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎨 Customization

### Colors and Themes
The application uses a custom purple gradient theme defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#8b5cf6',  // Main purple
    600: '#7c3aed',
  },
  accent: {
    500: '#a855f7',  // Accent purple
    600: '#9333ea',
  }
}
```

### Animations
Custom animations are defined in the Tailwind config and can be customized:

```javascript
animation: {
  'fade-in': 'fadeIn 0.6s ease-in-out',
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
}
```

## 📱 Pages

### Public Pages
- **Home** (`/`) - Mesmerizing landing page with animated hero section
- **Login** (`/login`) - User authentication with glass morphism design
- **Register** (`/register`) - User registration with animated form

### Protected Pages
- **Dashboard** (`/dashboard`) - User overview with token balance and quick actions
- **Send Tokens** (`/send-tokens`) - Send tokens to other users
- **Rewards** (`/rewards`) - Browse and redeem available rewards
- **Transaction History** (`/history`) - View all token transactions

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Tokens
- `POST /api/tokens/buy` - Buy tokens (simulated)
- `POST /api/tokens/send` - Send tokens to another user
- `GET /api/tokens/history` - Get transaction history
- `GET /api/tokens/balance` - Get user token balance

### Rewards
- `GET /api/rewards` - Get all available rewards
- `POST /api/rewards/:id/redeem` - Redeem a reward

### Users
- `GET /api/users/profile` - Get user profile with stats
- `GET /api/users/search` - Search for users
- `GET /api/users/leaderboard` - Get user leaderboard

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variables for API URL

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Add to backend environment variables

## 🎯 Features

### Core Features
- ✅ User authentication and authorization
- ✅ Token purchase and management
- ✅ Send tokens with custom messages
- ✅ Reward redemption system
- ✅ Transaction history and tracking
- ✅ Email notifications
- ✅ Responsive design

### UI/UX Features
- ✅ Glass morphism design
- ✅ Animated gradients and particles
- ✅ Smooth page transitions
- ✅ Interactive hover effects
- ✅ Loading states and animations
- ✅ Mobile-first responsive design
- ✅ Accessibility features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Framer Motion for amazing animations
- Tailwind CSS for utility-first styling
- Lucide React for beautiful icons
- MongoDB Atlas for database hosting

---

**Token of Thanks** - Making gratitude effortless with mesmerizing design ✨ 