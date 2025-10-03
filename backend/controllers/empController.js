const db = require('../database');

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateEmployee = (name, email, position) => {
    const errors = [];

    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }
    if (!email || email.trim() === '') {
        errors.push('Email is required');
    } else if (!validateEmail(email)) {
        errors.push('Invalid email format');
    }
    if (!position || position.trim() === '') {
        errors.push('Position is required');
    }

    return errors;
};

// GET all employees
exports.getAllEmployees = (req, res) => {
    const query = 'SELECT * FROM employees';
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

// GET single employee
exports.getEmployeeById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM employees WHERE id = ?';
    db.get(query, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json(row); // ✅ fixed
    });
};

// POST create employee
exports.createEmployee = (req, res) => {
    const { name, email, position } = req.body;
    const errors = validateEmployee(name, email, position);
    if (errors.length > 0) return res.status(400).json({ errors });

    const query = 'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)';
    db.run(query, [name.trim(), email.trim(), position.trim()], function (err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'Employee created successfully',
            employee: {
                id: this.lastID,
                name: name.trim(),
                email: email.trim(),
                position: position.trim()
            }
        });
    });
};

// PUT update employee
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, email, position } = req.body;

    const errors = validateEmployee(name, email, position);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Employee not found' });

        const query = 'UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?';
        db.run(query, [name.trim(), email.trim(), position.trim(), id], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({
                message: 'Employee updated successfully',
                employee: { id: parseInt(id), name: name.trim(), email: email.trim(), position: position.trim() }
            });
        });
    });
};

// DELETE employee
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Employee not found' });

        const query = 'DELETE FROM employees WHERE id = ?';
        db.run(query, [id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Employee deleted successfully', deletedId: parseInt(id) });
        });
    });
};
