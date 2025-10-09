# Employee Data Management System (ASE Challenge By VERTO)👥

A full-stack web application for managing employee data with a modern, responsive interface and RESTful API backend.

---

## 🌐 Live Demo

- **Backend API:** [https://teamdesk.onrender.com/](https://teamdesk.onrender.com/)
- **Frontend App:** [https://teamdesk.vercel.app/](https://teamdesk.vercel.app/)
---

## 🎯 Project Overview

This Employee Management System allows users to perform complete CRUD (Create, Read, Update, Delete) operations on employee records. Built with a clean separation between frontend and backend, it features a beautiful, mobile-responsive UI with dark mode support.

## ✨ Features

### Core Functionality
- ✅ **CRUD Operations**
  - Create new employee records with validation
  - Read and display all employees in a searchable table
  - Update existing employee information in real-time
  - Delete employee records with confirmation
  - Batch operations support (planned)

- 🔄 **State Management**
  - Context API for global state
  - Centralized error handling
  - Loading states for async operations
  - Success/Error notifications
  - Form state management
  - Theme persistence

- 🔍 **Search & Filter**
  - Real-time search functionality
  - Filter by name, email, or position
  - Debounced search input
  - Case-insensitive matching
  - Empty state handling

- 📊 **Data Management**
  - SQLite database integration
  - API error handling
  - Data validation
  - Unique email enforcement
  - Timestamp tracking
  - Pagination support (planned)

- 🔒 **Validation & Security**
  - Input sanitization
  - Required field validation
  - Email format validation
  - SQL injection prevention
  - CORS configuration
  - Error boundary implementation

### UI/UX Features
- 🎨 Modern, gradient-based design
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔍 Real-time search functionality
- ✨ Smooth animations and transitions
- 👤 Avatar initials for each employee
- 📊 Employee count statistics

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request parsing

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Fetch** - HTTP client

### Testing
- **Jest** - Testing framework
- **Supertest** - API endpoint testing

## 📁 Project Structure

```
employee-data-mgmt/
├── backend/
│   ├── server.js              # Express server setup
│   ├── database.js            # SQLite database configuration
│   ├── routes/
│   │   └── employees.js       # Employee routes
│   ├── controllers/
│   │   └── employeeController.js  # Business logic
│   ├── tests/
│   │   └── employees.test.js  # API tests
│   ├── package.json
│   └── employees.db           # SQLite database file
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── EmployeeTable.js   # Main table component
    │   │   ├── EmployeeForm.js    # Add/Edit form
    │   │   └── SearchBar.js       # Search component
    │   ├── services/
    │   │   └── employeeService.js # API calls
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── public/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd employee-data-mgmt
```

2. **Backend Setup**
```bash
cd backend
npm install
npm start
```
Server runs on: `http://localhost:5000`

3. **Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm run dev
```
App runs on: `http://localhost:5173`

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Expected Test Results
```
PASS  tests/employees.test.js
  Employee API Tests
    ✓ should create a new employee
    ✓ should get all employees
    ✓ should get employee by ID
    ✓ should update an employee
    ✓ should delete an employee
    ✓ should fail to create employee with missing fields
    ✓ should fail to create employee with invalid email

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Time:        2.5s
```

### Test Coverage
The test suite includes **7 comprehensive tests** covering:
- ✅ All CRUD operations (Create, Read, Update, Delete)
- ✅ Input validation (required fields, email format)
- ✅ Error handling (400 validation errors)
- ✅ Edge cases (empty fields, invalid email)
- ✅ HTTP status codes verification
- ✅ Database integrity

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get single employee |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Request/Response Examples

**POST /api/employees**
```json
{
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Senior Developer"
}
```

**Response (201)**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Senior Developer",
  "created_at": "2025-10-02T10:30:00.000Z"
}
```

## 🗄️ Database Schema

```sql
CREATE TABLE employees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  position TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Test Coverage
- CRUD operations
- Input validation
- Error handling
- Email format validation
- Duplicate email prevention

## 🙏 Acknowledgments

- Tailwind CSS for utility-first styling
- Lucide React for beautiful icons
- SQLite for lightweight database solution

## 👤 Author

Created as part of an Employee Data Management coding challenge.

---

**Built with ❤️ using React and Node.js**
