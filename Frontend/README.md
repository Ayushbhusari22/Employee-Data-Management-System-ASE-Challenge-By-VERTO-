# Employee Management System

## Overview
A modern React-based employee management system with features like dark/light theme, search functionality, and CRUD operations.

## Features

- 🌓 Dark/Light theme switching
- 🔍 Real-time search filtering
- ➕ Add new employees
- ✏️ Edit existing employees
- ❌ Delete employees
- 📊 Employee data management
- 📱 Responsive design

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- Context API


### Prerequisites

- Node.js 16.0 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Alert.jsx
│   ├── EmployeeForm.jsx
│   ├── EmployeeManagement.jsx
│   ├── EmployeeRow.jsx
│   ├── EmployeeTable.jsx
│   ├── SearchBar.jsx
│   └── StatsFooter.jsx
├── services/
│   └── EmployeeService.js
├── App.jsx
└── main.jsx
```

## Component Architecture

### EmployeeManagement (Parent Component)
- Manages global state using Context API
- Handles theme switching
- Controls form visibility
- Manages API operations

### EmployeeTable
- Displays employee data in tabular format
- Supports sorting and filtering
- Handles row-level operations

### EmployeeForm
- Handles employee creation and updates
- Form validation
- API integration for CRUD operations

### SearchBar
- Real-time search functionality
- Filters by name, email, and position

## State Management
Using React Context API for global state management:

- Employee data
- Theme preferences
- Search filters
- Loading states
- Error/Success messages

## Styling
- Tailwind CSS for utility-first styling
- Custom animations for smooth transitions
- Responsive design for mobile devices
- Dark/Light theme support

## API Integration
API endpoints are managed through `EmployeeService.js`:

- GET /employees
- POST /employees
- PUT /employees/:id
- DELETE /employees/:id

## Error Handling
- Graceful error handling with user feedback
- Fallback to demo data if API fails
- Loading states for async operations