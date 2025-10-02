# Employee Management System 👥

A full-stack web application for managing employee data with a modern, responsive interface and RESTful API backend.

## 🎯 Project Overview

This Employee Management System allows users to perform complete CRUD (Create, Read, Update, Delete) operations on employee records. Built with a clean separation between frontend and backend, it features a beautiful, mobile-responsive UI with dark mode support.

## ✨ Features

### Core Functionality
- ✅ **Create** new employee records
- ✅ **Read** and display all employees in a searchable table
- ✅ **Update** existing employee information
- ✅ **Delete** employee records
- ✅ **Search/Filter** employees by name, email, or position

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
npm run dev
```
Server runs on: `http://localhost:5000`

3. **Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm start
```
App runs on: `http://localhost:3000`

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

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Theme Support

Toggle between light and dark modes:
- Light: Modern gradient with soft blues
- Dark: Sleek dark gray with vibrant accents

## 🔒 Validation

### Frontend Validation
- Required fields check
- Email format validation
- Real-time error messages

### Backend Validation
- Required fields enforcement
- Email uniqueness check
- SQL injection prevention
- Proper error responses

## 📝 Development Workflow

1. Create feature branch
2. Implement changes
3. Write/update tests
4. Test locally
5. Submit pull request

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Tailwind CSS for utility-first styling
- Lucide React for beautiful icons
- SQLite for lightweight database solution

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using React and Node.js**
