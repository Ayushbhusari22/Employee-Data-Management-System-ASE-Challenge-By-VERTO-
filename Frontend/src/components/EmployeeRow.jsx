import React, { useContext, useState } from "react";
import { EmployeeContext } from "./EmployeeManagement";
import { Edit, Trash2, Loader } from "lucide-react";
import employeeAPI from "../EmployeeService";

function EmployeeRow ({ emp, index }) {
    const {
        employees,
        setEmployees,
        deleting, setDeleting,
        setEditingEmployee,
        setIsFormOpen,
        setSuccess,
        setError,
        theme
    } = useContext(EmployeeContext);

    const isDark = theme === 'dark';

    const handleEdit = () => {
        setEditingEmployee(emp);
        setIsFormOpen(true);
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete ${emp.name}?`)) {
            setDeleting(true);
            try {
                await employeeAPI.delete(emp.id);
                setEmployees(employees.filter(e => e.id !== emp.id));
                setSuccess("Employee deleted successfully!");
                setTimeout(() => setSuccess(''), 3000);
            } catch (error) {
                console.error("Error deleting employee:", error);
                setError("Failed to delete employee. Please try again.");
                setTimeout(() => setError(''), 3000);
            } finally {
                setDeleting(false);
            }
        }
    };

    return (
        <tr
            className={`transition-all duration-200 ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-indigo-50/50'
                } ${deleting ? 'opacity-50' : ''}`}
            style={{ animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both` }}
        >
            <td className={`px-6 py-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <span className="font-medium">{emp.name}</span>
            </td>
            <td className={`px-6 py-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {emp.email}
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
                    }`}>
                    {emp.position}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleEdit}
                        disabled={deleting}
                        className={`p-2 rounded-lg transition-all duration-200 ${isDark
                            ? 'hover:bg-blue-900 text-blue-400 hover:text-blue-300'
                            : 'hover:bg-blue-100 text-blue-600 hover:text-blue-700'
                            }`}
                        title="Edit"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-1 ${isDark
                            ? 'hover:bg-red-900/50 text-red-400 hover:text-red-300'
                            : 'hover:bg-red-100 text-red-600 hover:text-red-700'
                            }`}
                        title="Delete"
                    >
                        {deleting ? <Loader size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default EmployeeRow;