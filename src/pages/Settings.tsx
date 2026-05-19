import { useState } from 'react';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Shield, Bell, Database } from 'lucide-react';

export default function Settings() {
  const { currentUser, users } = useStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'system', name: 'System', icon: Database },
  ];

  if (currentUser?.role !== 'admin') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <User className="h-8 w-8 text-gray-400 mr-4" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-600">
                Username: {currentUser?.username}<br />
                Email: {currentUser?.email}<br />
                Role: {currentUser?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage system settings and user accounts</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <p className="text-sm text-gray-600">Update your account details</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Username"
                  defaultValue={currentUser?.username}
                  disabled
                />
                <Input
                  label="Email"
                  defaultValue={currentUser?.email}
                  disabled
                />
                <Input
                  label="Role"
                  defaultValue={currentUser?.role}
                  disabled
                />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                <p className="text-sm text-gray-600">Manage password and authentication</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                <p className="text-sm text-gray-600">Choose what notifications you want to receive</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="asset-assignments"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="asset-assignments" className="ml-2 block text-sm text-gray-900">
                    Asset assignments and returns
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="maintenance-reminders"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenance-reminders" className="ml-2 block text-sm text-gray-900">
                    Maintenance reminders
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="system-updates"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="system-updates" className="ml-2 block text-sm text-gray-900">
                    System updates and announcements
                  </label>
                </div>
                <Button>Save Preferences</Button>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">System Information</h3>
                <p className="text-sm text-gray-600">View system statistics and manage users</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'admin').length}
                  </div>
                  <div className="text-sm text-gray-600">Administrators</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {users.filter(u => u.role === 'hr').length}
                  </div>
                  <div className="text-sm text-gray-600">HR Users</div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">User Management</h4>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{user.username}</p>
                        <p className="text-sm text-gray-600">{user.email} • {user.role}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="secondary" size="sm">Edit</Button>
                        <Button variant="danger" size="sm">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4">Add New User</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}