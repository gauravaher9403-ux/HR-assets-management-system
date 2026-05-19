import { useState } from 'react';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Plus, Edit, Trash2, User, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { Asset } from '../types';

const categories = [
  { value: 'Laptop', label: 'Laptop' },
  { value: 'Desktop', label: 'Desktop' },
  { value: 'Monitor', label: 'Monitor' },
  { value: 'Mobile Device', label: 'Mobile Device' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Software', label: 'Software' },
  { value: 'Other', label: 'Other' },
];

export default function Assets() {
  const { assets, employees, addAsset, updateAsset, deleteAsset, assignAsset, returnAsset, currentUser } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [assigningAsset, setAssigningAsset] = useState<Asset | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Asset>();
  const { register: registerAssign, handleSubmit: handleAssignSubmit, reset: resetAssign, setValue: setAssignValue } = useForm();

  const isEmployee = currentUser?.role === 'employee';
  const canEdit = currentUser?.role === 'admin' || currentUser?.role === 'hr';

  // Filter assets based on role
  const visibleAssets = isEmployee 
    ? assets.filter(a => a.assignedTo === currentUser?.employeeId)
    : assets;

  const openModal = (asset?: Asset) => {
    if (asset) {
      setEditingAsset(asset);
      setValue('name', asset.name);
      setValue('category', asset.category);
      setValue('serialNumber', asset.serialNumber);
      setValue('purchaseDate', asset.purchaseDate);
      setValue('purchasePrice', asset.purchasePrice);
      setValue('currentValue', asset.currentValue);
      setValue('location', asset.location);
      setValue('description', asset.description);
    } else {
      setEditingAsset(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAsset(null);
    reset();
  };

  const openAssignModal = (asset: Asset) => {
    setAssigningAsset(asset);
    setAssignValue('employeeId', '');
    setAssignValue('notes', '');
  };

  const closeAssignModal = () => {
    setAssigningAsset(null);
    resetAssign();
  };

  const onSubmit = (data: any) => {
    const assetData = {
      ...data,
      status: 'available' as const,
    };

    if (editingAsset) {
      updateAsset(editingAsset.id, assetData);
    } else {
      addAsset(assetData);
    }
    closeModal();
  };

  const onAssignSubmit = (data: any) => {
    if (assigningAsset) {
      assignAsset(assigningAsset.id, data.employeeId, data.notes);
    }
    closeAssignModal();
  };

  const handleReturn = (assetId: string) => {
    returnAsset(assetId);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      deleteAsset(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'disposed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assets</h1>
          <p className="text-gray-600">Manage company assets</p>
        </div>
        {canEdit && (
          <Button onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {visibleAssets.map((asset) => {
            const assignedEmployee = employees.find(e => e.id === asset.assignedTo);
            return (
              <li key={asset.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-600">{asset.category} • {asset.serialNumber}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                          {asset.location}
                          {assignedEmployee && (
                            <>
                              <User className="flex-shrink-0 ml-4 mr-1.5 h-4 w-4" />
                              {assignedEmployee.firstName} {assignedEmployee.lastName}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${getStatusColor(asset.status)}`}>
                          {asset.status}
                        </span>
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(asset.currentValue)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Purchased: {formatDate(asset.purchaseDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                  {canEdit && (
                    <div className="flex space-x-2 ml-4">
                      {asset.status === 'available' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openAssignModal(asset)}
                        >
                          Assign
                        </Button>
                      )}
                      {asset.status === 'assigned' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleReturn(asset.id)}
                        >
                          Return
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openModal(asset)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(asset.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {assets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No assets found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Asset Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingAsset ? 'Edit Asset' : 'Add Asset'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Asset Name"
            {...register('name', { required: 'Asset name is required' })}
            error={errors.name?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categories}
              {...register('category', { required: 'Category is required' })}
              error={errors.category?.message}
            />
            <Input
              label="Serial Number"
              {...register('serialNumber', { required: 'Serial number is required' })}
              error={errors.serialNumber?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Purchase Date"
              type="date"
              {...register('purchaseDate', { required: 'Purchase date is required', valueAsDate: true })}
              error={errors.purchaseDate?.message}
            />
            <Input
              label="Purchase Price"
              type="number"
              step="0.01"
              {...register('purchasePrice', { required: 'Purchase price is required', valueAsNumber: true })}
              error={errors.purchasePrice?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Current Value"
              type="number"
              step="0.01"
              {...register('currentValue', { required: 'Current value is required', valueAsNumber: true })}
              error={errors.currentValue?.message}
            />
            <Input
              label="Location"
              {...register('location', { required: 'Location is required' })}
              error={errors.location?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Optional description..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingAsset ? 'Update' : 'Add'} Asset
            </Button>
          </div>
        </form>
      </Modal>

      {/* Assign Asset Modal */}
      <Modal
        isOpen={!!assigningAsset}
        onClose={closeAssignModal}
        title="Assign Asset"
      >
        <form onSubmit={handleAssignSubmit(onAssignSubmit)} className="space-y-4">
          <Select
            label="Assign to Employee"
            options={employees.map(emp => ({
              value: emp.id,
              label: `${emp.firstName} ${emp.lastName} (${emp.department})`
            }))}
            {...registerAssign('employeeId', { required: 'Please select an employee' })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              {...registerAssign('notes')}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Optional notes..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeAssignModal}>
              Cancel
            </Button>
            <Button type="submit">Assign Asset</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}