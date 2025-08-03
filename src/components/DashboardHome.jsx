/**
 * DashboardHome Component - Main Dashboard Overview
 * 
 * This component serves as the main dashboard homepage displaying:
 * - Key performance metrics and statistics
 * - Revenue and subscriber analytics
 * - Subscription plan performance overview
 * - Recent platform activity feed
 * - Quick action buttons for common tasks
 * 
 * Features:
 * - Real-time statistics display with trend indicators
 * - Subscription plan breakdown with subscriber counts
 * - Activity timeline with categorized events
 * - Responsive grid layout for different screen sizes
 * - Interactive cards with hover effects
 * 
 * Data Structure:
 * - Stats: Revenue, subscribers, chat buttons, conversion rates
 * - Subscription Plans: Basic, Professional, Diamond with pricing and counts
 * - Recent Activity: Timestamped events with categorization
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  MessageSquare, 
  Crown, 
  Star,
  Gem,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function DashboardHome() {
  // Main dashboard statistics with trend indicators
  const stats = [
    {
      title: 'إجمالي الإيرادات', // Total Revenue
      value: '₹45,231',
      change: '+20.1%',
      trend: 'up', // Trend direction for styling
      icon: DollarSign,
      description: 'من الشهر الماضي' // From last month
    },
    {
      title: 'المشتركون النشطون', // Active Subscribers
      value: '2,350',
      change: '+180',
      trend: 'up',
      icon: Users,
      description: 'جديد هذا الشهر' // New this month
    },
    {
      title: 'أزرار الدردشة المنشأة', // Chat Buttons Created
      value: '12,234',
      change: '+19%',
      trend: 'up',
      icon: MessageSquare,
      description: 'إجمالي الأزرار المولدة' // Total buttons generated
    },
    {
      title: 'معدل التحويل', // Conversion Rate
      value: '3.2%',
      change: '-0.4%',
      trend: 'down',
      icon: TrendingUp,
      description: 'من زائر إلى مشترك' // Visitor to subscriber
    }
  ]

  // Subscription plans data with performance metrics
  const subscriptionPlans = [
    {
      name: 'الخطة الأساسية', // Basic Plan
      price: '₹19.99',
      subscribers: 1250,
      color: 'bg-blue-500', // Color for visual identification
      icon: Star
    },
    {
      name: 'الخطة الاحترافية', // Professional Plan
      price: '₹29.99',
      subscribers: 850,
      color: 'bg-purple-500',
      icon: Crown
    },
    {
      name: 'الخطة الماسية', // Diamond Plan
      price: '₹36.99',
      subscribers: 250,
      color: 'bg-amber-500',
      icon: Gem
    }
  ]

  // Recent platform activity with timestamps and categorization
  const recentActivity = [
    { action: 'مشترك جديد انضم للخطة الماسية', time: 'منذ دقيقتين', type: 'subscription' }, // New subscriber joined Diamond Plan
    { action: 'تم إنشاء زر دردشة للواتساب', time: 'منذ 5 دقائق', type: 'creation' }, // Chat button created for WhatsApp
    { action: 'تم استلام دفعة من المستخدم #1234', time: 'منذ 10 دقائق', type: 'payment' }, // Payment received from user
    { action: 'تم تجديد اشتراك الخطة الاحترافية', time: 'منذ 15 دقيقة', type: 'renewal' }, // Professional Plan subscription renewed
    { action: 'مستخدم جديد سجل حساب', time: 'منذ 20 دقيقة', type: 'registration' } // New user registered
  ]

  return (
    <div className="space-y-6" dir="rtl">
      {/* Dashboard header with title and current date */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">نظرة عامة على لوحة التحكم</h1>
          <p className="text-gray-600 mt-1">مرحباً بعودتك! إليك ما يحدث في منصتك.</p>
        </div>
        {/* Current date display */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">{new Date().toLocaleDateString('ar-SA', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Statistics grid - responsive layout for different screen sizes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow h-48">
            <CardContent className="p-6 h-full">
              <div className="flex flex-col h-full justify-between">
                {/* Stat value and icon display */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  {/* Icon with trend-based color coding */}
                  <div className={`p-3 rounded-full flex-shrink-0 ${stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <stat.icon className={`w-6 h-6 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
                {/* Trend indicator with change percentage */}
                <div className="flex items-center mt-4">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 ml-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 ml-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 mr-2">{stat.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column layout for subscription plans and recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Plans Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Crown className="w-5 h-5 ml-2" />
              أداء خطط الاشتراك
            </CardTitle>
            <CardDescription>
              توزيع المشتركين الحالي عبر الخطط
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Individual subscription plan cards */}
            {subscriptionPlans.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  {/* Plan icon with color coding */}
                  <div className={`p-2 rounded-lg ${plan.color}`}>
                    <plan.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{plan.name}</p>
                    <p className="text-sm text-gray-500">{plan.price}/شهر</p>
                  </div>
                </div>
                {/* Subscriber count display */}
                <div className="text-left">
                  <p className="font-bold text-gray-900">{plan.subscribers}</p>
                  <p className="text-sm text-gray-500">مشترك</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 ml-2" />
              النشاط الأخير
            </CardTitle>
            <CardDescription>
              آخر الأحداث والإجراءات في منصتك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity timeline items */}
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 space-x-reverse p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  {/* Activity indicator dot */}
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  {/* Activity type badge */}
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
            {/* View all activity button */}
            <Button variant="outline" className="w-full mt-4">
              عرض جميع الأنشطة
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section - Common administrative tasks */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>
            المهام الإدارية الشائعة
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Quick action buttons grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Users className="w-6 h-6" />
              <span>إدارة المستخدمين</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <DollarSign className="w-6 h-6" />
              <span>تحديث الأسعار</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <MessageSquare className="w-6 h-6" />
              <span>عرض التحليلات</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

