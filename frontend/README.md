# Token of Thanks - Frontend

React frontend for the Token of Thanks digital gratitude platform with beautiful purple gradient design.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Backend API running (see backend README)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

The app will open on `http://localhost:3000`

## 🎨 Design Features

### Color Palette
- **Primary**: #6C63FF (Purple)
- **Accent**: #9D8CFF (Light Purple)
- **Background**: Soft white/gray
- **Text**: Dark gray/black

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Gradient backgrounds and buttons
- Smooth animations with Framer Motion
- Responsive design with Tailwind CSS
- Glass morphism effects
- Hover animations and transitions

## 📱 Pages

### Homepage (`/`)
- Hero section with "Gratitude, Made Effortless"
- How it works section
- Statistics and testimonials
- Call-to-action buttons

### Authentication
- **Login** (`/login`) - Email/password login
- **Register** (`/register`) - User registration with validation

### Dashboard (`/dashboard`)
- Token balance display
- Quick action buttons
- Recent transactions
- User statistics

### Send Tokens (`/send-tokens`)
- Recipient email search
- Token amount selection
- Message composition
- Suggested messages

### Rewards (`/rewards`)
- Available rewards grid
- Category filtering
- Redemption functionality
- Stock management

### Transaction History (`/history`)
- Paginated transaction list
- Filter by transaction type
- Detailed transaction information
- Export capabilities

## 🧩 Components

### Core Components
- `Navbar` - Navigation with user menu
- `LoadingSpinner` - Animated loading indicator
- `AuthContext` - Authentication state management

### Page Components
- `Home` - Landing page
- `Login` - Authentication form
- `Register` - Registration form
- `Dashboard` - Main user interface
- `SendTokens` - Token sending interface
- `Rewards` - Rewards marketplace
- `TransactionHistory` - Transaction tracking

## 🎯 Features

### Authentication
- JWT token management
- Protected routes
- Automatic token refresh
- User session persistence

### Token Management
- Real-time balance updates
- Transaction history
- Send tokens with messages
- Purchase simulation

### Rewards System
- Browse available rewards
- Category filtering
- Redemption process
- Stock tracking

### User Experience
- Responsive design
- Smooth animations
- Toast notifications
- Loading states
- Error handling

## 🛠️ Tech Stack

### Core
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Framer Motion** - Animations

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Custom gradients** - Purple theme
- **Responsive design** - Mobile-first

### State Management
- **React Context** - Authentication state
- **Local Storage** - Token persistence
- **React Hooks** - Component state

### UI/UX
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Google Fonts** - Typography

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   └── LoadingSpinner.js
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication state
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Login.js        # Login form
│   ├── Register.js     # Registration form
│   ├── Dashboard.js    # Main dashboard
│   ├── SendTokens.js   # Send tokens
│   ├── Rewards.js      # Rewards marketplace
│   └── TransactionHistory.js
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  primary: {
    500: '#6C63FF', // Main purple
    // ... other shades
  },
  accent: {
    500: '#9D8CFF', // Light purple
    // ... other shades
  }
}
```

### Animations
Custom animations are defined in `tailwind.config.js`:

```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.5s ease-out',
  'bounce-gentle': 'bounceGentle 2s infinite',
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Deploy automatically

### Environment Variables
```bash
REACT_APP_API_URL=https://your-backend-api.com
```

## 🔧 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations

## 🐛 Troubleshooting

### Common Issues
1. **API connection failed**: Check backend URL and CORS settings
2. **Authentication errors**: Verify JWT token handling
3. **Styling issues**: Ensure Tailwind CSS is properly configured

### Development Tips
- Use React Developer Tools for debugging
- Check browser console for errors
- Verify API endpoints with Postman
- Test responsive design on different screen sizes

## 📝 Contributing

1. Follow the existing code style
2. Add proper error handling
3. Test on multiple devices
4. Update documentation as needed
5. Use meaningful commit messages 