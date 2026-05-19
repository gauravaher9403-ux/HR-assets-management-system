import { useState } from 'react';
import { useStore } from '../lib/store';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';

export default function UserManagement() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('employee');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, currentUser } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await signUp(email, password, {
        username: username || email.split('@')[0],
        role: role as 'admin' | 'hr' | 'employee',
        ...(role === 'employee' && employeeId ? { employeeId } : {}),
      });
      if (success) {
        // Reset form
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('employee');
        setEmployeeId('');
        alert('User created successfully');
      } else {
        setError('User creation failed. Please try again.');
      }
    } catch (err) {
      setError('User creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = currentUser?.role === 'admin'
    ? [
        { value: 'admin', label: 'Admin' },
        { value: 'hr', label: 'HR' },
        { value: 'employee', label: 'Employee' },
      ]
    : [
        { value: 'employee', label: 'Employee' },
      ];

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Select
          id="role"
          name="role"
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={roleOptions}
        />
        {role === 'employee' && (
          <Input
            id="employeeId"
            name="employeeId"
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        )}
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </Button>
      </form>
    </div>
  );
}