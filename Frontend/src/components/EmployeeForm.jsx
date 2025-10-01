import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../App";
import { addEmployee, updateEmployee } from "../EmployeeService";
import { X } from "lucide-react";
import { v1 as uuidv1 } from "uuid";

function EmployeeForm () {
    const {
        employees, setEmployees,
        editingForm, setEditingForm,
        loading, setLoading,
        setIsFormOpen, setSuccess, setError
    } = useContext(EmployeeContext);

    const [formData, setFormData] = useState({ name: "", email: "", position: "" });

    useEffect(() => {
        if (editingForm) setFormData(editingForm);
    }, [editingForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingForm) { //update
                const updated = await updateEmployee(editingForm.id, formData);
                const updatedEmployee = {
                    id: editingForm.id,
                    name: formData.name,
                    email: formData.email,
                    position: formData.position,
                    ...updated 
                };
                setEmployees(employees.map(emp =>
                    emp.id === editingForm.id ? updatedEmployee : emp
                ));

                setSuccess("Employee updated successfully!");
            } else { //create
                const newEmployee = await addEmployee(formData);

                const completeNewEmployee = {
                    id: uuidv1(),
                    name: formData.name,
                    email: formData.email,
                    position: formData.position,
                    ...newEmployee
                };
                setEmployees(prevEmployees => [completeNewEmployee, ...prevEmployees]);
                setSuccess("Employee added successfully!");
            }
            setIsFormOpen(false);
            setEditingForm(null);
        } catch {
            console.error("Error saving employee:", error);
            setError("Failed to save employee");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">
                        {editingForm ? "Edit Employee" : "Add Employee"}
                    </h2>
                    <button onClick={() => setIsFormOpen(false)}>
                        <X className="w-6 h-6 text-gray-600 cursor-pointer" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({
                            ...formData,
                            name: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({
                            ...formData,
                            email: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input type="text"
                        placeholder="Position"
                        value={formData.position}
                        onChange={(e) => setFormData({
                            ...formData,
                            position: e.target.value
                        })}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                    >
                        {loading ? "Saving..." : editingForm ? "Update" : "Add"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeForm;