import React, { useContext } from "react";
import { EmployeeContext } from "../App";
import EmployeeRow from "./EmployeeRow";
import { v4 as uuidv4 } from 'uuid';

function EmployeeTable () {
    const { employees, searchName } = useContext(EmployeeContext);

    const filtered = (employees || []).filter(emp => {
        const name = emp?.name ?? "";
        const email = emp?.email ?? "";
        const position = emp?.position ?? "";
        return (
            name.toLowerCase().includes((searchName ?? "").toLowerCase()) ||
            email.toLowerCase().includes((searchName ?? "").toLowerCase()) ||
            position.toLowerCase().includes((searchName ?? "").toLowerCase())
        );
    });


    if (filtered.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg text-center text-gray-500">
                No employees found.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Position</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(emp => (
                        <EmployeeRow key={emp?.id || uuidv4()} employee={emp} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;