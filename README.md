# Bhartiyas Transport - Transportation Booking Website

A fully functional, beautifully designed transportation booking website with Indian-themed aesthetics, Google Maps integration, and complete user authentication.

## 🚗 Features

### User Features
- **User Registration & Login**: Complete authentication system with validation
- **Smart Booking System**: Multi-step booking form with real-time validation
- **Google Maps Integration**: Calculate distance and fare automatically
- **Multiple Vehicle Options**: Sedan, SUV, and Hatchback
- **Transparent Pricing**: Fixed rate of ₹25/km with no hidden charges
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **24/7 Service**: Round-the-clock availability

### Technical Features
- **Pure HTML/CSS/JavaScript**: No framework dependencies
- **Google Maps API**: Real-time route calculation and distance measurement
- **Local Storage**: Client-side data persistence
- **Form Validation**: Comprehensive input validation
- **Animated UI**: Smooth transitions and micro-interactions
- **Indian Theme**: Colors inspired by the Indian flag (Saffron, White, Green)

## 📁 File Structure

```
bhartiyas-transport/
├── index.html              # Homepage
├── about.html              # About Us page
├── services.html           # Services page
├── booking.html            # Booking page with Maps
├── login.html             # Login page
├── register.html          # Registration page
├── css/
│   └── style.css          # Main stylesheet with animations
├── js/
│   ├── main.js            # Homepage functionality
│   ├── auth.js            # Authentication logic
│   └── booking.js         # Booking system with Maps integration
└── images/
    └── logo.svg           # Company logo
```

## 🚀 Setup Instructions

### Prerequisites
- A Google Maps API key (for map functionality)
- A modern web browser
- A local web server (optional, recommended)

### Step 1: Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Directions API
4. Create credentials (API Key)
5. Copy your API key

### Step 2: Configure the API Key

Open `booking.html` and replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual API key:

```html
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places&callback=initMap"></script>
```

### Step 3: Deploy

#### Option 1: GitHub Pages (Recommended)

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select branch (main/master) and root directory
5. Click Save
6. Your site will be live at `https://yourusername.github.io/repository-name/`

#### Option 2: Local Testing

1. Install a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

2. Open browser and navigate to:
   ```
   http://localhost:8000
   ```

#### Option 3: Netlify/Vercel

1. Drag and drop the folder to Netlify or Vercel
2. Your site will be deployed instantly

## 💻 Usage Guide

### For Users

1. **Registration**
   - Navigate to `register.html` or click "Login" → "Register here"
   - Fill in all required fields
   - Password must be at least 8 characters
   - Accept terms and conditions
   - Click "Create Account"

2. **Login**
   - Navigate to `login.html` or click "Login"
   - Enter your email and password
   - Optionally check "Remember me"
   - Click "Login"

3. **Booking a Ride**
   - Go to `booking.html` or click "Book Now"
   - **Step 1**: Enter pickup and drop locations (autocomplete enabled)
   - Select date, time, and vehicle type
   - Click "Calculate Fare & Continue"
   - **Step 2**: Enter passenger details
   - Review the calculated fare
   - Click "Continue"
   - **Step 3**: Review booking summary
   - Confirm terms and click "Confirm Booking"
   - Your booking ID will be displayed

### For Developers

#### Customization

**Colors**: Edit CSS variables in `style.css`:
```css
:root {
    --primary: #FF6B35;
    --secondary: #138808;
    --accent-gold: #F7931E;
    /* ... */
}
```

**Pricing**: Change the rate in `booking.js`:
```javascript
bookingData.fare = Math.round(bookingData.distance * 25); // Change 25 to your rate
```

**Regions**: Modify autocomplete country in `booking.js`:
```javascript
componentRestrictions: { country: 'in' } // Change 'in' to your country code
```

## 🎨 Design Features

### Color Palette
- **Saffron (#FF9933)**: Represents courage and sacrifice
- **White (#FFFFFF)**: Represents peace and truth
- **Green (#138808)**: Represents prosperity and growth
- **Accent Orange (#FF6B35)**: Primary brand color
- **Accent Gold (#F7931E)**: Secondary brand color

### Animations
- Smooth page transitions
- Button hover effects
- Card hover elevations
- Form input focus states
- Loading animations
- Modal slide-ins

### Typography
- **Display**: Playfair Display (Serif)
- **Body**: Poppins (Sans-serif)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔒 Security Notes

⚠️ **Important**: This is a frontend-only demo. For production:

1. **Never store passwords in localStorage** - Use a proper backend with encryption
2. **Implement server-side validation** - Don't rely only on client-side validation
3. **Use HTTPS** - Always serve over secure connection
4. **Protect your API keys** - Use environment variables and restrict API key usage
5. **Add rate limiting** - Prevent abuse of forms and APIs
6. **Implement CSRF protection** - Add tokens to forms
7. **Sanitize inputs** - Prevent XSS attacks

## 🌟 Future Enhancements

- Payment gateway integration
- SMS/Email notifications
- Real-time driver tracking
- Ride history dashboard
- Rating and review system
- Multi-language support
- Push notifications
- Admin panel
- Analytics dashboard
- Mobile app versions

## 📄 License

This project is created for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Support

For questions or support:
- Email: info@bhartiyastransport.com
- Phone: +91 98765 43210

## 🙏 Credits

- Google Maps Platform for mapping services
- Google Fonts for typography
- Designed with love in India 🇮🇳

---

**Made with ❤️ for Bhartiyas Transport**
