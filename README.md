# HR Assets Management System Based on ERP

A comprehensive Human Resources and Asset Management system built with React, TypeScript, and Tailwind CSS. This application provides a complete ERP solution for managing employees, assets, assignments, and generating reports.

## Features

### 🔐 Authentication
- Role-based access control (Admin, HR Manager, Employee)
- Secure login system with demo credentials

### 👥 Employee Management
- Add, edit, and delete employee records
- Track employee details (name, email, department, position, salary)
- Employee status management (active/inactive)

### 📦 Asset Management
- Comprehensive asset tracking (laptops, monitors, furniture, etc.)
- Asset lifecycle management (available, assigned, maintenance, disposed)
- Asset assignment to employees
- Maintenance tracking and cost management

### 📊 Reports & Analytics
- Interactive dashboards with key metrics
- Charts for department distribution, asset status, and trends
- Asset value analysis and depreciation tracking
- Monthly assignment reports

### ⚙️ Settings
- User profile management
- System information and configuration
- Admin panel for user management

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hr-assets-erp
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Demo Credentials

- **Admin**: username: `admin`, password: `password`
- **HR Manager**: username: `hr_manager`, password: `password`
- **Employee**: username: `john_doe`, password: `password`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Modal, etc.)
│   └── Layout.tsx      # Main layout with navigation
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Employees.tsx
│   ├── Assets.tsx
│   ├── Reports.tsx
│   └── Settings.tsx
├── lib/                # Utilities and configurations
│   └── store.ts        # Zustand state management
├── types/              # TypeScript type definitions
├── data/               # Mock data
└── utils/              # Helper functions
```

## Key Features Overview

### Dashboard
- Overview of total employees, assets, and assignments
- Recent activity tracking
- Asset value summaries

### Employee Management
- CRUD operations for employee records
- Department and position tracking
- Salary and hire date management

### Asset Management
- Asset cataloging with categories
- Assignment workflow (assign/return assets)
- Maintenance scheduling and tracking

### Reports
- Visual analytics with charts and graphs
- Asset utilization reports
- Department-wise employee distribution
- Financial summaries (purchase vs. current value)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
