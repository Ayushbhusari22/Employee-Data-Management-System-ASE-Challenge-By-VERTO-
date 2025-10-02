const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/employees";

const employeeAPI = {
    getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        
        const response = await fetch(`${API_BASE_URL}`);
        if (!response.ok) throw new Error('Failed to fetch employees');
        return response.json();
    },

    create: async (employeeData) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to create employee');
        return response.json();
    },

    update: async (id, employeeData) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to update employee');
        return response.json();
    },

    delete: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete employee');
        return response.json();
    }
};

export default employeeAPI;
