/**
 * LoginPage Component - Admin Authentication Interface
 * 
 * This component provides a secure login interface for the admin dashboard.
 * Features:
 * - Email and password authentication
 * - Password visibility toggle
 * - Loading states during authentication
 * - Responsive design with gradient background
 * - Demo credentials display for testing
 * 
 * Props:
 * - onLogin: Function called when authentication is successful
 * 
 * Authentication Logic:
 * - Validates against hardcoded admin credentials (dmposhy04@gmail.com / admin123)
 * - Simulates API call with 1-second delay
 * - Shows error message for invalid credentials
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function LoginPage({ onLogin }) {
  // State management for form inputs and UI states
  const [email, setEmail] = useState('') // Admin email input
  const [password, setPassword] = useState('') // Admin password input
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [isLoading, setIsLoading] = useState(false) // Loading state during authentication

  /**
   * Handle form submission and authentication
   * Validates credentials against hardcoded admin account
   * Simulates API call with loading state
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API authentication call with 1 second delay
    setTimeout(() => {
      // Check if credentials match admin account
      if (email === 'dmposhy04@gmail.com' && password === 'A123456789a') {
        onLogin(true) // Successful authentication
      } else {
        alert('بيانات الدخول غير صحيحة') // Invalid credentials message in Arabic
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    // Main container with gradient background and centered layout
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        {/* Header section with logo and title */}
        <div className="text-center mb-8">
          {/* Logo container with gradient background */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          {/* Application title and subtitle */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat Connect</h1>
          <p className="text-gray-600">لوحة تحكم المالك</p>
        </div>

        {/* Login form card with glassmorphism effect */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">مرحباً بعودتك</CardTitle>
            <CardDescription className="text-center">
              سجل دخولك لإدارة منصتك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Authentication form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input field with icon */}
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 text-right"
                    required
                  />
                </div>
              </div>
              
              {/* Password input field with visibility toggle */}
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 text-right"
                    required
                  />
                  {/* Password visibility toggle button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit button with loading state */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

