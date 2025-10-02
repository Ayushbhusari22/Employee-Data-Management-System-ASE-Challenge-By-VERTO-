const request = require('supertest');
const app = require('./server');
const db = require('./database');

beforeEach((done) => {
    db.serialize(() => {
        db.run('DELETE FROM employees', () => {
            db.run(
                'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)',
                ['John Doe', 'john@example.com', 'Developer'],
                done
            );
        });
    });
});

afterAll((done) => {
    db.close(done);
});

describe('Employee API', () => {
    let employeeId;

    beforeEach((done) => {
        db.get('SELECT id FROM employees WHERE email = ?', ['john@example.com'], (err, row) => {
            employeeId = row.id;
            done();
        });
    });

    test('should create a new employee', async () => {
        const res = await request(app)
            .post('/api/employees')
            .send({ name: 'Alice Smith', email: 'alice@example.com', position: 'Designer' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Employee created successfully');
        expect(res.body.employee).toMatchObject({
            name: 'Alice Smith',
            email: 'alice@example.com',
            position: 'Designer'
        });
        // Check if employee is in DB
        const getRes = await request(app).get(`/api/employees/${res.body.employee.id}`);
        expect(getRes.statusCode).toBe(200);
        expect(getRes.body).toHaveProperty('email', 'alice@example.com');
    });

    test('should get all employees', async () => {
        const res = await request(app).get('/api/employees');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('name', 'John Doe');
    });

    test('should get employee by ID', async () => {
        const res = await request(app).get(`/api/employees/${employeeId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', employeeId);
        expect(res.body).toHaveProperty('email', 'john@example.com');
    });

    test('should update an employee', async () => {
        const res = await request(app)
            .put(`/api/employees/${employeeId}`)
            .send({ name: 'Jane Doe', email: 'jane@example.com', position: 'Manager' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Employee updated successfully');
        expect(res.body.employee).toMatchObject({
            id: employeeId,
            name: 'Jane Doe',
            email: 'jane@example.com',
            position: 'Manager'
        });
    });

    test('should delete an employee', async () => {
        const res = await request(app).delete(`/api/employees/${employeeId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Employee deleted successfully');
        expect(res.body).toHaveProperty('deletedId', employeeId);
        // Ensure employee is gone
        const getRes = await request(app).get(`/api/employees/${employeeId}`);
        expect(getRes.statusCode).toBe(404);
    });

    test('should fail to create employee with missing fields', async () => {
        const res = await request(app)
            .post('/api/employees')
            .send({ name: '', email: '', position: '' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors.length).toBeGreaterThan(0);
    });

    test('should fail to create employee with invalid email', async () => {
        const res = await request(app)
            .post('/api/employees')
            .send({ name: 'Test', email: 'invalid-email', position: 'Tester' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors).toContain('Invalid email format');
    });
});