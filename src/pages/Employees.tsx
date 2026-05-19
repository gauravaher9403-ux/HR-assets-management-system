import { useState } from 'react';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { formatCurrency } from '../utils/helpers';
import { Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { Employee } from '../types';

const departments = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'HR', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Operations', label: 'Operations' },
];

export default function Employees() {
  const { employees, addEmployee, updateEmployee, deleteEmployee, currentUser } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Employee>();

  const canEdit = currentUser?.role === 'admin' || currentUser?.role === 'hr';

  const openModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setValue('firstName', employee.firstName);
      setValue('lastName', employee.lastName);
      setValue('email', employee.email);
      setValue('phone', employee.phone);
      setValue('department', employee.department);
      setValue('position', employee.position);
      setValue('hireDate', employee.hireDate);
      setValue('salary', employee.salary);
      setValue('status', employee.status);
    } else {
      setEditingEmployee(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    reset();
  };

  const onSubmit = (data: any) => {
    const employeeData = data;

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, employeeData);
    } else {
      addEmployee(employeeData);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage employee information</p>
        </div>
        {canEdit && (
          <Button onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        )}
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {employees.map((employee) => (
            <li key={employee.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        {employee.email}
                        <Phone className="flex-shrink-0 ml-4 mr-1.5 h-4 w-4" />
                        {employee.phone}
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <p className="text-sm text-gray-600">{employee.department}</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(employee.salary)}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        employee.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                    </div>
                  </div>
                </div>
                {canEdit && (
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openModal(employee)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        {employees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No employees found</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              {...register('firstName', { required: 'First name is required' })}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              {...register('lastName', { required: 'Last name is required' })}
              error={errors.lastName?.message}
            />
          </div>

          <Input
            label="Email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />

          <Input
            label="Phone"
            {...register('phone', { required: 'Phone is required' })}
            error={errors.phone?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Department"
              options={departments}
              {...register('department', { required: 'Department is required' })}
              error={errors.department?.message}
            />
            <Input
              label="Position"
              {...register('position', { required: 'Position is required' })}
              error={errors.position?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Hire Date"
              type="date"
              {...register('hireDate', { required: 'Hire date is required', valueAsDate: true })}
              error={errors.hireDate?.message}
            />
            <Input
              label="Salary"
              type="number"
              {...register('salary', { required: 'Salary is required', valueAsNumber: true })}
              error={errors.salary?.message}
            />
          </div>

          <Select
            label="Status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            {...register('status', { required: 'Status is required' })}
            error={errors.status?.message}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingEmployee ? 'Update' : 'Add'} Employee
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}