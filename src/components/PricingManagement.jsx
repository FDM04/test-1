/**
 * PricingManagement Component - Manages Subscription Plans and Pricing
 * 
 * This component provides an interface for administrators to:
 * - View, edit, add, and delete subscription plans.
 * - Adjust monthly and yearly pricing for each plan.
 * - Manage features included in each plan.
 * - Toggle plan activity status.
 * 
 * Features:
 * - Displays key statistics: total plans, active plans, total subscribers.
 * - Interactive cards for each plan with edit/save functionality.
 * - Dynamic feature list management (add/remove).
 * - Responsive design for various screen sizes.
 * 
 * State Management:
 * - `plans`: Array of subscription plan objects.
 * - `editingPlan`: Stores the plan currently being edited.
 * - `showAddPlan`: Controls visibility of the 'Add New Plan' form (not fully implemented in this snippet).
 * 
 * Functions:
 * - `handleEditPlan`: Sets the selected plan for editing.
 * - `handleSavePlan`: Saves changes to a plan.
 * - `handleCancelEdit`: Discards changes and exits edit mode.
 * - `handleDeletePlan`: Removes a plan after confirmation.
 * - `handleTogglePlan`: Activates or deactivates a plan.
 * - `addFeature`: Adds a new feature to the currently editing plan.
 * - `removeFeature`: Removes a feature from the currently editing plan.
 * - `getColorClasses`: Helper to get Tailwind CSS color classes based on plan color.
 */

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Star, 
  Crown, 
  Gem, 
  Edit, 
  Save, 
  X, 
  Plus,
  Trash2,
  DollarSign,
  Users,
  Check
} from 'lucide-react'

export default function PricingManagement() {
  // Initial state for subscription plans
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'الخطة الأساسية', // Basic Plan
      description: 'مثالية للأفراد والشركات الصغيرة', // Perfect for individuals and small businesses
      monthlyPrice: 19.99,
      yearlyPrice: 16.99,
      features: ['تطبيق دردشة واحد', 'تخصيص أساسي', 'دعم عبر البريد الإلكتروني'], // 1 Chat Application, Basic Customization, Email Support
      maxApps: 1,
      isActive: true,
      subscribers: 1250,
      icon: Star,
      color: 'blue'
    },
    {
      id: 2,
      name: 'الخطة الاحترافية', // Professional Plan
      description: 'مثالية للشركات النامية', // Ideal for growing businesses
      monthlyPrice: 29.99,
      yearlyPrice: 24.99,
      features: ['5 تطبيقات دردشة', 'تخصيص متقدم', 'دعم ذو أولوية', 'لوحة تحكم للتحليلات'], // 5 Chat Applications, Advanced Customization, Priority Support, Analytics Dashboard
      maxApps: 5,
      isActive: true,
      subscribers: 850,
      icon: Crown,
      color: 'purple'
    },
    {
      id: 3,
      name: 'الخطة الماسية', // Diamond Plan
      description: 'للشركات الكبيرة والمستخدمين المتقدمين', // For enterprises and power users
      monthlyPrice: 36.99,
      yearlyPrice: 33.99,
      features: ['تطبيقات غير محدودة', 'تخصيص كامل', 'دعم 24/7', 'تحليلات متقدمة', 'علامة بيضاء'], // Unlimited Applications, Full Customization, 24/7 Support, Advanced Analytics, White Label
      maxApps: -1, // -1 means unlimited
      isActive: true,
      subscribers: 250,
      icon: Gem,
      color: 'amber'
    }
  ])

  // State for managing the currently edited plan and add new plan form visibility
  const [editingPlan, setEditingPlan] = useState(null)
  const [showAddPlan, setShowAddPlan] = useState(false)

  /**
   * Handles setting a plan to edit mode.
   * @param {object} plan - The plan object to be edited.
   */
  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan })
  }

  /**
   * Handles saving changes to a plan.
   * Updates the plans array with the modified plan.
   */
  const handleSavePlan = () => {
    setPlans(plans.map(plan => 
      plan.id === editingPlan.id ? editingPlan : plan
    ))
    setEditingPlan(null)
  }

  /**
   * Handles canceling the edit operation.
   * Resets the editingPlan state.
   */
  const handleCancelEdit = () => {
    setEditingPlan(null)
  }

  /**
   * Handles deleting a plan after user confirmation.
   * @param {number} planId - The ID of the plan to be deleted.
   */
  const handleDeletePlan = (planId) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الخطة؟')) { // Are you sure you want to delete this plan?
      setPlans(plans.filter(plan => plan.id !== planId))
    }
  }

  /**
   * Handles toggling the active status of a plan.
   * @param {number} planId - The ID of the plan to toggle.
   */
  const handleTogglePlan = (planId) => {
    setPlans(plans.map(plan => 
      plan.id === planId ? { ...plan, isActive: !plan.isActive } : plan
    ))
  }

  /**
   * Adds a new feature to the currently editing plan.
   * @param {number} planId - The ID of the plan to add the feature to.
   * @param {string} feature - The new feature string.
   */
  const addFeature = (planId, feature) => {
    if (editingPlan && editingPlan.id === planId) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, feature]
      })
    }
  }

  /**
   * Removes a feature from the currently editing plan.
   * @param {number} planId - The ID of the plan to remove the feature from.
   * @param {number} featureIndex - The index of the feature to remove.
   */
  const removeFeature = (planId, featureIndex) => {
    if (editingPlan && editingPlan.id === planId) {
      setEditingPlan({
        ...editingPlan,
        features: editingPlan.features.filter((_, index) => index !== featureIndex)
      })
    }
  }

  /**
   * Returns Tailwind CSS classes for plan card styling based on color.
   * @param {string} color - The color string (e.g., 'blue', 'purple', 'amber').
   * @returns {string} Tailwind CSS classes.
   */
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-100',
      purple: 'bg-purple-500 text-purple-600 bg-purple-100',
      amber: 'bg-amber-500 text-amber-600 bg-amber-100'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header section for Pricing Management */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة الأسعار</h1> {/* Pricing Management */}
          <p className="text-gray-600 mt-1">إدارة خطط الاشتراك والأسعار لمنصتك.</p> {/* Manage subscription plans and pricing for your platform. */}
        </div>
        {/* Add New Plan button */}
        <Button 
          onClick={() => setShowAddPlan(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 ml-2" /> {/* Plus icon */}
          إضافة خطة جديدة {/* Add New Plan */}
        </Button>
      </div>

      {/* Pricing Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Plans Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي الخطط</p> {/* Total Plans */}
                <p className="text-2xl font-bold text-gray-900 mt-1">{plans.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Plans Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الخطط النشطة</p> {/* Active Plans */}
                <p className="text-2xl font-bold text-gray-900 mt-1">{plans.filter(p => p.isActive).length}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Subscribers Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المشتركين</p> {/* Total Subscribers */}
                <p className="text-2xl font-bold text-gray-900 mt-1">{plans.reduce((sum, plan) => sum + plan.subscribers, 0)}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Plans Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isEditing = editingPlan && editingPlan.id === plan.id
          const currentPlan = isEditing ? editingPlan : plan
          const IconComponent = plan.icon
          const colorClasses = getColorClasses(plan.color).split(' ')

          return (
            <Card key={plan.id} className={`relative ${!plan.isActive ? 'opacity-60' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {/* Plan Icon */}
                    <div className={`p-2 rounded-lg ${colorClasses[0]}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      {/* Plan Name - editable in edit mode */}
                      {isEditing ? (
                        <Input
                          value={currentPlan.name}
                          onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                          className="font-bold text-lg text-right"
                        />
                      ) : (
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {/* Plan Active Toggle */}
                    <Switch
                      checked={plan.isActive}
                      onCheckedChange={() => handleTogglePlan(plan.id)}
                    />
                    {/* Edit Button - visible when not editing */}
                    {!isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPlan(plan)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Plan Description - editable in edit mode */}
                {isEditing ? (
                  <Textarea
                    value={currentPlan.description}
                    onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                    className="mt-2 text-right"
                  />
                ) : (
                  <CardDescription className="text-right">{plan.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Pricing Section */}
                <div className="space-y-2">
                  {/* Monthly Price */}
                  <div className="flex items-center justify-between">
                    <Label>السعر الشهري (ريال سعودي)</Label> {/* Monthly Price (SAR) */}
                    {isEditing ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={currentPlan.monthlyPrice}
                        onChange={(e) => setEditingPlan({...editingPlan, monthlyPrice: parseFloat(e.target.value)})}
                        className="w-24 text-left"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">{`ر.س ${currentPlan.monthlyPrice}`}</span>
                    )}
                  </div>
                  
                  {/* Yearly Price */}
                  <div className="flex items-center justify-between">
                    <Label>السعر السنوي (ريال سعودي)</Label> {/* Yearly Price (SAR) */}
                    {isEditing ? (
                      <Input
                        type="number"
                        step="0.01"
                        value={currentPlan.yearlyPrice}
                        onChange={(e) => setEditingPlan({...editingPlan, yearlyPrice: parseFloat(e.target.value)})}
                        className="w-24 text-left"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-green-600">{`ر.س ${currentPlan.yearlyPrice}/شهر`}</span>
                    )}
                  </div>
                </div>

                {/* Features Section */}
                <div className="space-y-2">
                  <Label>الميزات</Label> {/* Features */}
                  <div className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between">
                        {isEditing ? (
                          <div className="flex items-center space-x-2 space-x-reverse w-full">
                            <Input
                              value={feature}
                              onChange={(e) => {
                                const newFeatures = [...editingPlan.features]
                                newFeatures[index] = e.target.value
                                setEditingPlan({...editingPlan, features: newFeatures})
                              }}
                              className="flex-1 text-right"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFeature(plan.id, index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Add Feature Button - visible in edit mode */}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addFeature(plan.id, 'ميزة جديدة')}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة ميزة {/* Add Feature */}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Subscribers Count */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-600">المشتركون</span> {/* Subscribers */}
                  <Badge variant="secondary">{plan.subscribers}</Badge>
                </div>

                {/* Action Buttons (Save/Cancel or Delete) */}
                {isEditing ? (
                  <div className="flex space-x-2 space-x-reverse pt-4">
                    <Button
                      onClick={handleSavePlan}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 ml-2" />
                      حفظ {/* Save */}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 ml-2" />
                      إلغاء {/* Cancel */}
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2 space-x-reverse pt-4">
                    <Button
                      variant="outline"
                      onClick={() => handleDeletePlan(plan.id)}
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 ml-2" />
                      حذف {/* Delete */}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

