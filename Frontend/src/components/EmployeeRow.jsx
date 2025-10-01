import React, { useContext, useState } from "react";
import { EmployeeContext } from "../App";
import { Edit2, Trash2 } from "lucide-react";
import { deleteEmployee } from "../EmployeeService";

function EmployeeRow ({ employee }) {
    const { setEditingForm, setIsFormOpen, employees, setEmployees, setSuccess } = useContext(EmployeeContext);

    const handleDelete = async () => {
        if (window.confirm("Delete this employee?")) {
            try {
                await deleteEmployee(employee.id);
                setEmployees(employees.filter(emp => emp.id !== employee.id));
                setSuccess("Employee deleted successfully!");
            } catch {
                setError("Failed to delete Employee.");
            }
        }
    };

    return (
        <tr className="border-t hover:bg-gray-50">
            <td className="px-4 py-2">{employee.name}</td>
            <td className="px-4 py-2">{employee.email}</td>
            <td className="px-4 py-2">{employee.position}</td>
            <td className="px-4 py-2 text-right">
                <button
                    onClick={() => { setEditingForm(employee); setIsFormOpen(true); }}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                >
                    <Edit2 className="inline w-4 h-4 mr-1" /> Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800"
                >
                    <Trash2 className="inline w-4 h-4 mr-1" /> Delete
                </button>
            </td>
        </tr>
    )
};

export default EmployeeRow;