import React, { useContext, useState } from "react";
import { EmployeeContext } from "../App";
import { Edit2, Trash2 } from "lucide-react";

function EmployeeRow ({ employee }) {
    const { setEditingForm, setIsFormOpen, employees, setEmployees, setSuccess } = useContext(EmployeeContext);

    const handleDelete = () => {
        if (window.confirm("Delete this employee?")) {
            setEmployees(employees.filter(emp => emp.id != employee.id));
            setSuccess("Employee deleted successfully!");
        }
    };

    return (
     <></>
    )
};

export default EmployeeRow;