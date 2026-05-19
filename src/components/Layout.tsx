import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../lib/store';
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  UserPlus
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useStore();

  const isAdmin = currentUser?.role === 'admin';
  const isHR = currentUser?.role === 'hr';

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    ...(isAdmin || isHR ? [{ name: 'Employees', href: '/employees', icon: Users }] : []),
    { name: 'Assets', href: '/assets', icon: Package },
    ...(isAdmin || isHR ? [{ name: 'Reports', href: '/reports', icon: FileText }] : []),
    ...(isAdmin || isHR ? [{ name: 'User Management', href: '/user-management', icon: UserPlus }] : []),
    ...(isAdmin ? [{ name: 'Settings', href: '/settings', icon: Settings }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">HR Assets ERP</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium mb-1 ${
                    location.pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <div className="flex flex-col h-full bg-white shadow-lg">
          <div className="flex items-center p-6 border-b">
            <h1 className="text-xl font-bold text-gray-900">HR Assets ERP</h1>
          </div>
          <nav className="flex-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium mb-1 ${
                    location.pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{currentUser?.username}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser?.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold">HR Assets ERP</h1>
            <div className="w-6" />
          </div>
        </div>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}