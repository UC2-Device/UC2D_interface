# Crop Management Interface (uc2d_interface)

## Project Overview

A comprehensive React-based crop management dashboard providing intelligent agricultural monitoring and analytics. The application features complete user authentication with OTP verification, device management for agricultural sensors, subscription-based analytics with premium features, and integrated payment processing. Built with modern React patterns and responsive design, the system offers real-time session tracking, interactive data visualization, and QR code device integration for seamless user experience.

This frontend application demonstrates enterprise-level React development with context management, payment gateway integration, and agricultural data analytics visualization.

## Link 
  [https://projects.uc2d.chiragbansal.in/login](https://projects.uc2d.chiragbansal.in/login)
  
## Project Structure

```
Directory structure:
└── uc2-device-uc2d_interface/
    ├── README.md
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vercel.json
    ├── .npmrc
    ├── public/
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── reportWebVitals.js
        ├── setupTests.js
        ├── Authentication_API/
        │   ├── Authentication.js
        │   └── authenticationFunction.js
        ├── Component/
        │   ├── Chartcard.js
        │   ├── Infocard.js
        │   ├── Navbar.js
        │   ├── Payment.js
        │   ├── Planupgrade.js
        │   ├── Qrcodescanner.js
        │   ├── Sessionpurchase.js
        │   ├── Statusbadge.js
        │   └── Usagebar.js
        ├── Constants/
        │   └── API_URL.js
        ├── Pages/
        │   ├── Buypack.js
        │   ├── Dashboard.js
        │   ├── forgotPassword.js
        │   ├── home.js
        │   ├── login.js
        │   ├── signup.js
        │   └── verifyEmail.js
        ├── Routes/
        │   ├── finalRoute.js
        │   └── privateRoute.js
        └── Utility/
            └── Razorpay.js

```

## Technical Details

**Technology Stack:**
- **Frontend**: React 18, React Router v6, Context API
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UI Components**: Headless UI, Heroicons React
- **Data Visualization**: Recharts for interactive charts
- **Payment**: Razorpay integration for subscriptions
- **QR Scanner**: react-qr-reader for device registration
- **HTTP Client**: Axios for API communication

**Core Features:**
- JWT-based authentication with OTP email verification
- Real-time device status monitoring and session tracking
- Interactive analytics dashboard with premium tier restrictions
- Subscription management with flexible payment options
- Responsive design with mobile-first approach
- QR code scanner for easy device ID input

## Data Flow Model

```
                         CROP MANAGEMENT INTERFACE DATA FLOW
                                    
    ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
    │  USER LOGIN     │ SUBMIT   │  AUTH SERVICE   │   API    │  BACKEND AUTH   │
    │                 │ -------> │                 │ -------> │                 │
    │ Credentials     │          │ Login Handler   │          │ JWT Generation  │
    └─────────────────┘          └─────────────────┘          └─────────────────┘
                                          │                             │
                                          ▼ TOKEN RECEIVED              ▼
                                ┌─────────────────┐          ┌─────────────────┐
                                │  AUTH CONTEXT   │          │  SESSION STORE  │
                                │                 │          │                 │
                                │ Global State    │          │ JWT Storage     │
                                └─────────────────┘          └─────────────────┘
                                          │
                                          ▼ AUTHENTICATED
                                ┌─────────────────┐
                                │ DASHBOARD LOAD  │
                                │                 │
                                │ Component Mount │
                                └─────────────────┘
                                          │
                                          ▼ FETCH DATA
                                ┌─────────────────┐
                                │  API SERVICES   │
                                │                 │
                                │ Device/Session  │
                                └─────────────────┘
                                    │         │
                          DEVICE ───┘         └─── ANALYTICS
                            │                         │
                            ▼                         ▼
                  ┌─────────────────┐       ┌─────────────────┐
                  │ DEVICE MANAGER  │       │ CHART RENDERER  │
                  │                 │       │                 │
                  │ Status & Usage  │       │ Recharts Visual │
                  └─────────────────┘       └─────────────────┘
                            │                         │
                            ▼ PREMIUM CHECK           ▼ PLAN CHECK
                  ┌─────────────────┐       ┌─────────────────┐
                  │ SESSION TRACKER │       │ FEATURE GATE    │
                  │                 │       │                 │
                  │ Usage Progress  │       │ Blur/Restrict   │
                  └─────────────────┘       └─────────────────┘
                            │                         │
                            ▼ UPGRADE NEEDED?         │
                  ┌─────────────────┐                 │
                  │ PAYMENT MODAL   │ <───────────────┘
                  │                 │
                  │ Razorpay Gateway│
                  └─────────────────┘
                            │
                            ▼ PAYMENT SUCCESS
                  ┌─────────────────┐
                  │  UPDATE PLAN    │
                  │                 │
                  │ Refresh State   │
                  └─────────────────┘

         APPLICATION LAYERS:
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │  AUTHENTICATION │    │   DASHBOARD     │    │  SUBSCRIPTION   │
    │                 │    │                 │    │                 │
    │ • JWT Context   │    │ • Device Mgmt   │    │ • Plan Tiers    │
    │ • OTP Flow      │    │ • Analytics     │    │ • Razorpay      │
    │ • Session Mgmt  │    │ • QR Scanner    │    │ • Usage Limits  │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
```

## User Interface

<img width="1898" height="868" alt="image" src="https://github.com/user-attachments/assets/532e9aae-732d-4b51-a351-9b6ebd42ac51" />

<img width="1331" height="818" alt="image" src="https://github.com/user-attachments/assets/a2341b97-3a5d-41d2-a478-702c4f671dfd" />

## How to Use and Play

### Installation
```bash
git clone https://github.com/organization/uc2d_interface.git
cd uc2d_interface
npm install
# Configure environment variables (API endpoints, Razorpay keys)
npm start
```
Access at `http://localhost:3000`

### Usage Flow
1. Register account with email and device ID (QR scanner available)
2. Verify email via OTP and complete authentication
3. View dashboard with device status and session usage
4. Monitor crop analytics and health insights
5. Upgrade to premium for advanced features and unlimited analysis
6. Manage subscription and purchase additional sessions as needed

### Controls & Features
- **Controls**: Dashboard navigation, device management, plan selection, payment processing, QR scanner
- **Features**: Real-time analytics, subscription tiers, session tracking, premium feature gating, responsive design
