import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/AuthProvider';
import MsiteLayOut from './layouts/MsiteLayOut';
import SplashScreen from './screens/SplashScreen';
import SignIn from './screens/SignIn';
import Darshan from './screens/Darshan';
import ProtectedRoute from './utils/ProtectedRoute';
import OTPVerification from './screens/OTPVerification';
import Profile from './screens/Profile';
import Legal from './screens/Legal';
import TermAndConditions from './screens/TermAndConditions';
import Orders from './screens/Orders';

// App component
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MsiteLayOut />}>
            <Route index element={<SplashScreen />} />
            <Route path="SignIn" element={<SignIn />} />
            <Route path="Darshan" element={<Darshan />} />
            <Route path="OTPVerification" element={<OTPVerification />} />
            {/* Protected Routes */}
            <Route
              path="Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            /><Route
              path="Legal"
              element={
                <ProtectedRoute>
                  <Legal />
                </ProtectedRoute>
              }
            />
            <Route
              path="Orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="TermAndConditions"
              element={
                <ProtectedRoute>
                  <TermAndConditions />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
