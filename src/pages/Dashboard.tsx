import { useStore } from '../lib/store';
import { formatCurrency } from '../utils/helpers';
import { Users, Package, TrendingUp, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { employees, assets, assignments, currentUser } = useStore();

  const isEmployee = currentUser?.role === 'employee';

  // Filter data based on role
  const visibleEmployees = isEmployee ? employees.filter(e => e.id === currentUser?.employeeId) : employees;
  const visibleAssets = isEmployee 
    ? assets.filter(a => a.assignedTo === currentUser?.employeeId) 
    : assets;
  const visibleAssignments = isEmployee 
    ? assignments.filter(a => a.employeeId === currentUser?.employeeId)
    : assignments;

  const stats = [
    {
      name: isEmployee ? 'My Assets' : 'Total Employees',
      value: isEmployee ? visibleAssets.length : visibleEmployees.length,
      icon: isEmployee ? Package : Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Total Assets',
      value: visibleAssets.length,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Assigned Assets',
      value: visibleAssets.filter(a => a.status === 'assigned').length,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Assets in Maintenance',
      value: visibleAssets.filter(a => a.status === 'maintenance').length,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const totalAssetValue = visibleAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const recentAssignments = visibleAssignments.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to HR Assets Management System</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Asset Value Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Asset Value Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Current Value</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAssetValue)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Purchase Value</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(assets.reduce((sum, asset) => sum + asset.purchasePrice, 0))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Depreciation</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(
                assets.reduce((sum, asset) => sum + (asset.purchasePrice - asset.currentValue), 0)
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h2>
        <div className="space-y-3">
          {recentAssignments.map((assignment) => {
            const asset = assets.find(a => a.id === assignment.assetId);
            const employee = employees.find(e => e.id === assignment.employeeId);
            return (
              <div key={assignment.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{asset?.name}</p>
                  <p className="text-sm text-gray-600">
                    Assigned to {employee?.firstName} {employee?.lastName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(assignment.assignedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
          {recentAssignments.length === 0 && (
            <p className="text-gray-500 text-center py-4">No recent assignments</p>
          )}
        </div>
      </div>
    </div>
  );
}