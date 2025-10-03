import { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "./EmployeeManagement";
import employeeAPI from "../EmployeeService";
import { Loader } from "lucide-react";
import { v1 as uuidv1 } from "uuid";

function EmployeeForm () {
    const {
        employees,
        setEmployees,
        editingEmployee,
        setEditingEmployee,
        loading, 
        setLoading,
        setIsFormOpen,
        setSuccess,
        setError,
        theme
    } = useContext(EmployeeContext);

    const isDark = theme === 'dark';

    const [formData, setFormData] = useState({
        name: editingEmployee?.name || '',
        email: editingEmployee?.email || '',
        position: editingEmployee?.position || ''
    });

    useEffect(() => {
        if (editingEmployee) {
            setFormData({
                name: editingEmployee.name,
                email: editingEmployee.email,
                position: editingEmployee.position
            });
        }
    }, [editingEmployee]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingEmployee) {
                // Update existing employee
                const updated = await employeeAPI.update(editingEmployee.id, formData);

                const updatedEmployee = {
                    id: editingEmployee.id,
                    name: formData.name,
                    email: formData.email,
                    position: formData.position,
                    ...updated
                };

                setEmployees(employees.map(emp =>
                    emp.id === editingEmployee.id ? updatedEmployee : emp
                ));

                setSuccess("Employee updated successfully!");
            } else {
                // Create new employee
                const newEmployee = await employeeAPI.create(formData);

                const completeNewEmployee = {
                    id: newEmployee.id || uuidv1(),
                    name: formData.name,
                    email: formData.email,
                    position: formData.position,
                    ...newEmployee
                };

                setEmployees(prevEmployees => [...prevEmployees, completeNewEmployee]);
                setSuccess("Employee added successfully!");
            }

            setIsFormOpen(false);
            setEditingEmployee(null);
            setFormData({ name: '', email: '', position: '' });
            setTimeout(() => setSuccess(''), 3000);

        } catch (error) {
            console.error("Error saving employee:", error);
            setError("Failed to save employee. Please try again.");
            setTimeout(() => setError(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingEmployee(null);
        setFormData({ name: '', email: '', position: '' });
    };

    return (
        <div className={`mb-6 p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`px-4 py-2 rounded-lg border-2 ${isDark
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-800'
                        } outline-none focus:border-indigo-500`}
                    required
                    disabled={loading}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`px-4 py-2 rounded-lg border-2 ${isDark
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-800'
                        } outline-none focus:border-indigo-500`}
                    required
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className={`px-4 py-2 rounded-lg border-2 ${isDark
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-800'
                        } outline-none focus:border-indigo-500`}
                    required
                    disabled={loading}
                />
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.name || !formData.email || !formData.position}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading && <Loader size={16} className="animate-spin" />}
                    {loading ? 'Saving...' : (editingEmployee ? 'Update' : 'Add') + ' Employee'}
                </button>
                <button
                    onClick={handleCancel}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${isDark
                            ? 'bg-gray-700 hover:bg-gray-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EmployeeForm;