const request = require('supertest');
const app = require('../server'); 

describe('Employee API', () => {
    let createdEmployeeId;

    // POST - create employee
    it('should create a new employee', async () => {
        const res = await request(app)
            .post('/api/employees')
            .send({ name: 'Alice', email: 'alice@test.com', position: 'Developer' });

        expect(res.statusCode).toEqual(201);
        expect(res.body.employee).toHaveProperty('id');
        expect(res.body.employee.name).toBe('Alice');

        createdEmployeeId = res.body.employee.id; // save id for later tests
    });

    // GET all employees
    it('should get all employees', async () => {
        const res = await request(app).get('/api/employees');

        expect(res.statusCode).toEqual(200);
        expect(res.body.employees).toBeInstanceOf(Array);
    });

    // GET single employee
    it('should get employee by ID', async () => {
        const res = await request(app).get(`/api/employees/${createdEmployeeId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.employee.id).toBe(createdEmployeeId);
    });

    // PUT - update employee
    it('should update an employee', async () => {
        const res = await request(app)
            .put(`/api/employees/${createdEmployeeId}`)
            .send({ name: 'Alice Updated', email: 'alice.updated@test.com', position: 'Manager' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.employee.name).toBe('Alice Updated');
    });

    // DELETE - remove employee
    it('should delete an employee', async () => {
        const res = await request(app).delete(`/api/employees/${createdEmployeeId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.deletedId).toBe(createdEmployeeId);
    });

    // Validation test: missing fields
    it('should fail to create employee with missing fields', async () => {
        const res = await request(app).post('/api/employees').send({ name: '', email: '', position: '' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.errors.length).toBeGreaterThan(0);
    });

    // Validation test: invalid email
    it('should fail to create employee with invalid email', async () => {
        const res = await request(app)
            .post('/api/employees')
            .send({ name: 'Bob', email: 'invalidemail', position: 'Tester' });

        expect(res.statusCode).toEqual(400);
        expect(res.body.errors).toContain('Invalid email format');
    });
});
