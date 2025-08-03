/**
 * Dashboard Component - Main Admin Dashboard Layout
 * 
 * This component serves as the main layout for the admin dashboard, providing:
 * - Responsive sidebar navigation with menu items
 * - Top header with search functionality and notifications
 * - Content area that renders different components based on active tab
 * - User profile section with logout functionality
 * 
 * Features:
 * - Mobile-responsive sidebar with overlay
 * - Tab-based navigation system
 * - User authentication state management
 * - Notification badge display
 * - Search functionality (UI only)
 * 
 * Navigation Structure:
 * - Dashboard Home: Overview and statistics
 * - Pricing Management: Subscription plans and pricing
 * - User Management: Subscriber and user data (placeholder)
 * - Chat Buttons: Analytics for chat buttons (placeholder)
 * - Settings: Platform configuration (placeholder)
 * 
 * State Management:
 * - `activeTab`: Controls which content component is displayed
 * - `sidebarOpen`: Controls mobile sidebar visibility
 * 
 * Props:
 * - `onLogout`: Function called when user logs out
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Home, 
  DollarSign, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Crown
} from 'lucide-react'
import DashboardHome from './DashboardHome'
import PricingManagement from './PricingManagement'

export default function Dashboard({ onLogout }) {
  // State for managing active tab and sidebar visibility
  const [activeTab, setActiveTab] = useState('home') // Current active navigation tab
  const [sidebarOpen, setSidebarOpen] = useState(false) // Mobile sidebar visibility

  // Navigation menu items configuration
  const navigation = [
    { id: 'home', name: 'لوحة التحكم', icon: Home }, // Dashboard
    { id: 'pricing', name: 'إدارة الأسعار', icon: DollarSign }, // Pricing Management
    { id: 'users', name: 'إدارة المستخدمين', icon: Users }, // User Management
    { id: 'buttons', name: 'أزرار الدردشة', icon: MessageSquare }, // Chat Buttons
    { id: 'settings', name: 'الإعدادات', icon: Settings }, // Settings
  ]

  /**
   * Renders the appropriate content component based on the active tab
   * @returns {JSX.Element} The component to render in the main content area
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome />
      case 'pricing':
        return <PricingManagement />
      case 'users':
        // Placeholder component for User Management
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">إدارة المستخدمين</h3>
              <p className="text-gray-600">سيحتوي هذا القسم على وظائف إدارة المستخدمين بما في ذلك قوائم المشتركين وتفاصيل المستخدمين وإدارة الحسابات.</p>
            </div>
          </div>
        )
      case 'buttons':
        // Placeholder component for Chat Buttons Analytics
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">تحليلات أزرار الدردشة</h1>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">أزرار الدردشة</h3>
              <p className="text-gray-600">سيعرض هذا القسم تحليلات أزرار الدردشة وإحصائيات الاستخدام ومقاييس الأداء.</p>
            </div>
          </div>
        )
      case 'settings':
        // Placeholder component for Platform Settings
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">إعدادات المنصة</h3>
              <p className="text-gray-600">سيحتوي هذا القسم على تكوين المنصة وإعدادات البريد الإلكتروني وإعدادات بوابة الدفع والخيارات الإدارية الأخرى.</p>
            </div>
          </div>
        )
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile sidebar overlay - only visible on mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Application Logo */}
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Chat Connect</span>
          </div>
          {/* Close sidebar button - mobile only */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false) // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 ml-3" />
                  {item.name}
                </button>
              )
            })}
          </div>
        </nav>

        {/* User Profile Section - Fixed at bottom of sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex items-center space-x-3 space-x-reverse mb-3">
            {/* User Avatar */}
            <Avatar className="w-10 h-10">
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                مد {/* Admin initials in Arabic */}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">المدير</p> {/* Admin */}
              <p className="text-xs text-gray-500 truncate">dmposhy04@gmail.com</p>
            </div>
          </div>
          {/* Logout Button */}
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج {/* Sign Out */}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pr-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              {/* Search Bar - Desktop only */}
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث..." // Search...
                    className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  />
                </div>
              </div>
            </div>

            {/* Header Right Section */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Notification Bell with Badge */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  3
                </Badge>
              </Button>
              
              {/* User Profile - Desktop only */}
              <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                    مد {/* Admin initials in Arabic */}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">المدير</span> {/* Admin */}
              </div>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

