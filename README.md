[readme_backend.md](https://github.com/user-attachments/files/22628327/readme_backend.md)
# Employee Data Management System

A full-stack CRUD (Create, Read, Update, Delete) application for managing employee records with a RESTful API backend and persistent data storage.

## 📋 Project Description

This Employee Management System allows you to:
- Add new employees with name, email, and position
- View all employees in a structured format
- Update existing employee information
- Delete employee records
- Search and filter employees (planned frontend feature)

The application features a Node.js/Express backend with SQLite database for data persistence, comprehensive input validation, and a complete test suite ensuring reliability.

---

## 🏗️ Architecture Overview

### Backend Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Testing**: Jest + Supertest
- **API Design**: RESTful architecture

### Project Structure
```
backend/
├── controllers/
│   └── employeeController.js    # Business logic & CRUD operations
├── routes/
│   └── employees.js             # API route definitions
├── tests/
│   └── employees.test.js        # Comprehensive test suite
├── server.js                    # Express server setup
├── database.js                  # SQLite database configuration
├── package.json                 # Dependencies & scripts
└── employees.db                 # SQLite database (auto-generated)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

Check your versions:
```bash
node --version
npm --version
```

### Installation Steps

#### 1. Clone or Create Project Directory
```bash
mkdir employee-management
cd employee-management
mkdir backend
cd backend
```

#### 2. Create Project Structure
```bash
mkdir controllers routes tests
```

#### 3. Copy Project Files
Place the following files in their respective directories:
- `server.js` → `backend/`
- `database.js` → `backend/`
- `package.json` → `backend/`
- `employeeController.js` → `backend/controllers/`
- `employees.js` → `backend/routes/`
- `employees.test.js` → `backend/tests/`

#### 4. Install Dependencies
```bash
npm install
```

This will install:
- **express**: Web framework
- **sqlite3**: Database driver
- **cors**: Cross-origin resource sharing
- **body-parser**: Request body parsing
- **nodemon**: Development auto-reload (dev dependency)
- **jest**: Testing framework (dev dependency)
- **supertest**: API testing (dev dependency)

#### 5. Start the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will start on: **http://localhost:5000**

#### 6. Verify Installation
Open your browser or use curl:
```bash
curl http://localhost:5000
```

Expected response:
```json
{
  "message": "Employee Management API is running"
}
```

---

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage Report
```bash
npm test -- --coverage
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Tests with Verbose Output
```bash
npm test -- --verbose
```

### Expected Test Results
```
PASS  tests/employees.test.js
  Employee API Tests
    ✓ 24 tests passing
    
Test Suites: 1 passed, 1 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        3.5s
```

### Test Coverage
The test suite includes **24 comprehensive tests** covering:
- ✅ All CRUD operations (Create, Read, Update, Delete)
- ✅ Input validation (required fields, email format)
- ✅ Error handling (404s, duplicates, invalid data)
- ✅ Edge cases (whitespace trimming, long inputs, complex emails)
- ✅ HTTP status codes verification
- ✅ Database integrity

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/employees
```

### Endpoints

#### 1. Get All Employees
```http
GET /api/employees
```

**Response (200 OK)**:
```json
{
  "employees": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "position": "Software Engineer",
      "created_at": "2025-01-15 10:30:00"
    }
  ]
}
```

#### 2. Get Single Employee
```http
GET /api/employees/:id
```

**Response (200 OK)**:
```json
{
  "employee": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "position": "Software Engineer",
    "created_at": "2025-01-15 10:30:00"
  }
}
```

**Error (404 Not Found)**:
```json
{
  "error": "Employee not found"
}
```

#### 3. Create Employee
```http
POST /api/employees
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "position": "Product Manager"
}
```

**Response (201 Created)**:
```json
{
  "message": "Employee created successfully",
  "employee": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "position": "Product Manager"
  }
}
```

**Validation Errors (400 Bad Request)**:
```json
{
  "errors": [
    "Name is required",
    "Invalid email format"
  ]
}
```

#### 4. Update Employee
```http
PUT /api/employees/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com",
  "position": "Senior Software Engineer"
}
```

**Response (200 OK)**:
```json
{
  "message": "Employee updated successfully",
  "employee": {
    "id": 1,
    "name": "John Updated",
    "email": "john.new@example.com",
    "position": "Senior Software Engineer"
  }
}
```

#### 5. Delete Employee
```http
DELETE /api/employees/:id
```

**Response (200 OK)**:
```json
{
  "message": "Employee deleted successfully",
  "deletedId": 1
}
```

---

## 🧪 Manual API Testing

### Using cURL

**Create an employee**:
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "position": "Designer"
  }'
```

**Get all employees**:
```bash
curl http://localhost:5000/api/employees
```

**Update an employee**:
```bash
curl -X PUT http://localhost:5000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Updated",
    "email": "alice.new@example.com",
    "position": "Senior Designer"
  }'
```

**Delete an employee**:
```bash
curl -X DELETE http://localhost:5000/api/employees/1
```

### Using Postman or Thunder Client
1. Import the endpoints listed above
2. Set `Content-Type: application/json` header
3. Test each CRUD operation

---

## 🎨 Design Decisions & Assumptions

### Database Design
**Choice**: SQLite
- **Rationale**: Lightweight, serverless, zero-configuration
- **Trade-off**: Not suitable for high-concurrency production (use PostgreSQL/MySQL for production)
- **Schema**: Simple normalized structure with auto-incrementing ID
- **Timestamp**: Automatic `created_at` field for record tracking

### API Design
**Choice**: RESTful architecture
- **Standard HTTP methods**: GET, POST, PUT, DELETE
- **Resource-based URLs**: `/api/employees` and `/api/employees/:id`
- **Proper status codes**: 200 (success), 201 (created), 400 (validation error), 404 (not found), 500 (server error)
- **JSON responses**: Consistent structure with error messages

### Validation Strategy
**Implementation**: Server-side validation
- **Required fields**: name, email, position (all mandatory)
- **Email format**: Regex validation for proper email structure
- **Unique constraint**: Email must be unique across all employees
- **Whitespace handling**: Automatic trimming of input fields
- **Assumption**: All fields are required for business logic integrity

### Error Handling
**Approach**: Comprehensive error responses
- **Validation errors**: Detailed array of error messages
- **Database errors**: Proper handling of constraints and failures
- **Not found errors**: Clear 404 responses with descriptive messages
- **Duplicate detection**: Specific error for email uniqueness violation

### Testing Strategy
**Coverage**: 24 comprehensive tests
- **Unit tests**: Each CRUD operation tested individually
- **Integration tests**: Full API endpoint testing with database
- **Edge cases**: Empty strings, long inputs, complex emails, invalid formats
- **Assumption**: Tests run in isolation with database cleanup between test suites

### Code Organization
**Pattern**: MVC-inspired separation
- **Controllers**: Business logic separated from routes
- **Routes**: Thin route definitions with controller delegation
- **Database**: Centralized connection management
- **Assumption**: Clear separation of concerns for maintainability

### Security Considerations
**Current Implementation**:
- CORS enabled for cross-origin requests
- Input validation prevents SQL injection (parameterized queries)
- Email format validation prevents malicious input

**Not Implemented** (Future enhancements):
- Authentication/Authorization
- Rate limiting
- HTTPS enforcement
- Password hashing (if user authentication is added)

### Scalability Assumptions
**Current Design**: Single-server application
- **Assumption**: Low to medium traffic volume
- **Database**: SQLite suitable for development and small deployments
- **Future**: Can migrate to PostgreSQL/MySQL for production scale
- **No caching**: Direct database queries (add Redis for high-traffic scenarios)

---

## 🐛 Known Limitations

1. **Database**: SQLite not recommended for high-concurrency production environments
2. **Authentication**: No user authentication or authorization implemented
3. **Pagination**: All employees returned at once (add pagination for large datasets)
4. **Soft Delete**: Hard delete implemented (consider soft delete for data recovery)
5. **Audit Trail**: No tracking of who modified records or when

---

## 🔧 Troubleshooting

### Server won't start
**Issue**: Port 5000 already in use
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change port in server.js
```

### Tests failing
**Issue**: Database locked
```bash
# Stop the development server
# Delete the database file
rm employees.db
# Run tests again
npm test
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS errors (when frontend is added)
- Ensure CORS middleware is enabled in `server.js`
- Check that frontend URL is allowed in CORS configuration

---

## 📝 Future Enhancements

### Phase 2: Frontend (In Progress)
- React-based user interface
- Employee list with search/filter
- Add/Edit forms with validation
- Delete confirmation dialogs

### Planned Features
- [ ] User authentication and authorization
- [ ] Pagination for large datasets
- [ ] Advanced search and filtering
- [ ] Export to CSV/Excel
- [ ] Employee profile pictures
- [ ] Audit logs and history tracking
- [ ] Soft delete functionality
- [ ] Department/Team management
- [ ] Role-based access control

---

## 📄 License

This project is created as a coding challenge demonstration.

---

## 👤 Author

Created as part of an Employee Data Management coding challenge.

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review test output for specific errors
3. Verify all dependencies are installed correctly

---

**Last Updated**: January 2025  
**Version**: 1.0.0 (Backend Complete)  
**Status**: ✅ Phase 1 Complete | 🚧 Phase 2 In Progress
