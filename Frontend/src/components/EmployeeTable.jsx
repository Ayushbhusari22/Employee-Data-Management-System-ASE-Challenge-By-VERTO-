import React, { useContext } from "react";
import { EmployeeContext } from "../App";
import EmployeeRow from "./EmployeeRow";

function EmployeeTable () {
    const { employees, searchName } = useContext(EmployeeContext);

    const filtered = employees.filter(
        emp =>
            emp.name.toLowerCase().includes(searchName.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchName.toLowerCase()) ||
            emp.position.toLowerCase().includes(searchName.toLowerCase())
    );

    if (filtered.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg text-center text-gray-500">
                No employees found.
            </div>
        );
    }

    return (
      <></>
    );
}

export default EmployeeTable;