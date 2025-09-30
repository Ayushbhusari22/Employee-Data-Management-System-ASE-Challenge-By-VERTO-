import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../App";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingForm) { //update
                const updated = employees.map(emp =>
                    emp.id === editingForm.id ? { ...emp, ...formData } : emp
                );

                setEmployees(updated);
                setSuccess("Employee updated successfully!");
            } else { //create
                const newEmployee = { id: uuidv1(), ...formData };
                setEmployees([...employees, newEmployee]);
                setSuccess("Employee added successfully!");
            }
            setIsFormOpen(false);
            setEditingForm(null);
        } catch {
            setError("Failed to save employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <></>
    )
}

export default EmployeeForm;