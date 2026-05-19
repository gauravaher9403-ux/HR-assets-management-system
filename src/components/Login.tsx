import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, signUp } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        const success = await signUp(username, password, {
          username: username || username,
          role: role as 'admin' | 'hr' | 'employee',
          ...(role === 'employee' && employeeId ? { employeeId } : {}),
        });
        if (success) {
          setIsRegistering(false);
          alert('Account created successfully. Please log in.');
          setUsername('');
          setPassword('');
          setRole('employee');
          setEmployeeId('');
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        const success = await login(username, password);
        if (success) {
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            HR Assets Management System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isRegistering ? 'Register a new account' : 'Sign in to your account'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-t-md"
              />
            </div>
            {isRegistering && (
              <div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}
            {isRegistering && (
              <div className="space-y-3">
                <Select
                  id="role"
                  name="role"
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  options={[
                    { value: 'employee', label: 'Employee' },
                    { value: 'hr', label: 'HR' },
                    { value: 'admin', label: 'Admin' },
                  ]}
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
              </div>
            )}
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-b-md"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (isRegistering ? 'Registering...' : 'Signing in...') : (isRegistering ? 'Register' : 'Sign in')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}