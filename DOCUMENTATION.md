# HR Assets Management System - ERP

## Overview

The HR Assets Management System is a comprehensive Enterprise Resource Planning (ERP) application designed to streamline human resources and asset management processes. Built with modern web technologies, this system provides role-based access control for administrators, HR personnel, and employees, enabling efficient management of employees, assets, assignments, and maintenance records.

## Technologies Used

### Frontend Framework
- **React 19.2.4** - Modern JavaScript library for building user interfaces
- **TypeScript ~6.0.2** - Typed superset of JavaScript for enhanced development experience
- **Vite 8.0.4** - Fast build tool and development server

### Styling
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **@tailwindcss/vite 4.2.2** - Vite plugin for Tailwind CSS
- **@tailwindcss/postcss 4.2.2** - PostCSS plugin for Tailwind CSS
- **Autoprefixer 10.5.0** - CSS vendor prefixing
- **PostCSS 8.5.10** - CSS processing tool

### State Management
- **Zustand 5.0.0** - Lightweight state management solution

### Routing
- **React Router DOM 6.26.1** - Declarative routing for React

### Forms
- **React Hook Form 7.53.0** - Performant forms with easy validation

### UI Components
- **Lucide React 0.439.0** - Beautiful & consistent icon toolkit
- **Recharts 2.12.7** - Composable charting library built on React components

### Utilities
- **date-fns 4.1.0** - Modern JavaScript date utility library
- **clsx 2.1.1** - Utility for constructing className strings conditionally
- **tailwind-merge 2.5.2** - Utility for merging Tailwind CSS classes

### Development Tools
- **ESLint 9.39.4** - Pluggable JavaScript linter
- **TypeScript ESLint 8.58.0** - ESLint rules for TypeScript
- **@vitejs/plugin-react 6.0.1** - Vite plugin for React

### Database (Optional)
- **Firebase 12.12.0** - Backend-as-a-Service platform
- **@firebase/data-connect 0.6.0** - Firebase Data Connect for SQL-like database operations

## Features

### Authentication & Authorization
- **Role-Based Access Control**: Three user roles - Admin, HR, Employee
- **Secure Login**: Username/password authentication
- **User Registration**: Admin/HR can create new users
- **Local Storage**: User data stored in browser localStorage for offline functionality

### Dashboard
- **Overview Statistics**: Total employees, assets, assignments, maintenance records
- **Role-Based Filtering**: Data displayed based on user permissions
- **Real-time Updates**: Dynamic data visualization

### Employee Management
- **Employee Directory**: View and manage employee information
- **CRUD Operations**: Create, read, update, delete employees
- **Role-Based Access**: Admin and HR can manage employees

### Asset Management
- **Asset Inventory**: Track all company assets
- **Asset Assignment**: Assign assets to employees
- **Maintenance Tracking**: Monitor asset maintenance schedules
- **Status Management**: Track asset availability and condition

### Reports
- **Comprehensive Analytics**: Generate reports on employees, assets, and assignments
- **Data Visualization**: Charts and graphs for better insights
- **Export Capabilities**: Export reports in various formats

### User Management
- **User Creation**: Admin can create HR/Employee accounts, HR can create Employee accounts
- **Role Assignment**: Proper role assignment during user creation
- **Account Management**: View and manage user accounts

### Settings
- **System Configuration**: Admin-level system settings
- **User Preferences**: Personal user settings

## Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Input, etc.)
│   └── Layout.tsx      # Main layout component
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Employees.tsx
│   ├── Assets.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   └── UserManagement.tsx
├── services/           # API service layer
│   ├── authService.ts
│   ├── employeeService.ts
│   ├── assetService.ts
│   ├── assignmentService.ts
│   └── maintenanceService.ts
├── lib/                # Core libraries
│   ├── store.ts        # Zustand state management
│   └── firebase.ts     # Firebase configuration
├── types/              # TypeScript type definitions
├── data/               # Mock data
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

### State Management
The application uses Zustand for global state management, providing:
- User authentication state
- Application data (employees, assets, assignments, maintenance)
- Loading states and error handling
- Role-based data filtering

### Component Architecture
- **Functional Components**: All components are written as functional components with hooks
- **TypeScript**: Full type safety throughout the application
- **Modular Design**: Components are reusable and maintainable
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd erp-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5175`

## Usage

### Demo Credentials
- **Admin**: `admin` / `password`
- **HR**: `hr` / `password`
- **Employee**: `rajesh` / `password`

### Creating New Users
1. Log in as Admin or HR
2. Navigate to "User Management"
3. Fill in the user creation form
4. Select appropriate role
5. Submit to create the user

### Managing Employees
1. Log in as Admin or HR
2. Navigate to "Employees"
3. View, add, edit, or delete employee records

### Managing Assets
1. Log in with any role
2. Navigate to "Assets"
3. View asset inventory and assignments

## API Reference

### Authentication Service
- `signIn(username, password)` - Authenticate user
- `signUp(username, password, userData)` - Create new user
- `signOut()` - Sign out current user

### Data Services
- `employeeService` - CRUD operations for employees
- `assetService` - CRUD operations for assets
- `assignmentService` - CRUD operations for assignments
- `maintenanceService` - CRUD operations for maintenance records

## Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality
- **ESLint**: Configured for React and TypeScript
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (if configured)

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to web server**
   Serve the `dist` folder using any static web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.

---

**Note**: This application is designed to work offline using browser localStorage. For production use with persistent data storage, integrate with a backend database like Firebase Firestore or a custom API.</content>
<parameter name="filePath">c:/Users/ADMIN/Desktop/HR Assets Management System Based on ERP/ERP-System/DOCUMENTATION.md