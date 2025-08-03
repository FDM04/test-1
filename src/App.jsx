/**
 * App Component - Main Application Entry Point
 * 
 * This is the root component of the Chat Connect Admin Dashboard application.
 * It manages the authentication state and renders either the login page or
 * the main dashboard based on the user's authentication status.
 * 
 * Features:
 * - Authentication state management
 * - Conditional rendering based on login status
 * - Login/logout functionality
 * 
 * State Management:
 * - `isLoggedIn`: Boolean state tracking user authentication status
 * 
 * Functions:
 * - `handleLogin`: Called when user successfully authenticates
 * - `handleLogout`: Called when user logs out, resets authentication state
 * 
 * Component Structure:
 * - LoginPage: Rendered when user is not authenticated
 * - Dashboard: Rendered when user is authenticated
 * 
 * Authentication Flow:
 * 1. User starts at LoginPage
 * 2. Upon successful login, handleLogin(true) is called
 * 3. App state updates and Dashboard is rendered
 * 4. User can logout from Dashboard, calling handleLogout()
 * 5. App state resets and LoginPage is rendered again
 */

import { useState } from 'react'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  // Authentication state - determines which component to render
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  /**
   * Handles successful user authentication
   * @param {boolean} success - Authentication success status
   */
  const handleLogin = (success) => {
    setIsLoggedIn(success)
  }

  /**
   * Handles user logout
   * Resets authentication state to false
   */
  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      {/* Conditional rendering based on authentication status */}
      {isLoggedIn ? (
        // Render Dashboard when user is authenticated
        <Dashboard onLogout={handleLogout} />
      ) : (
        // Render LoginPage when user is not authenticated
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App

