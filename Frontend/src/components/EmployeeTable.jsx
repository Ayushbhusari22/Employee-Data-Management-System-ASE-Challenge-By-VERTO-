import React, { useContext } from "react";
import { EmployeeContext } from "./EmployeeManagement";
import EmployeeRow from "./EmployeeRow";
import { v1 as uuidv1 } from 'uuid';
import { User, Mail, Briefcase, Loader } from "lucide-react";

function EmployeeTable () {
    const { filteredEmployees, loading, theme } = useContext(EmployeeContext);
    const isDark = theme === 'dark';

    return (
        <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${isDark ? 'bg-gray-800 shadow-2xl' : 'bg-white shadow-xl'
            }`}>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className={`border-b-2 ${isDark ? 'bg-indigo-600 border-gray-700' : 'bg-indigo-500 border-gray-500'
                            }`}>
                            <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                <div className="flex items-center gap-2">
                                    <User size={18} />
                                    Name
                                </div>
                            </th>
                            <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                <div className="flex items-center gap-2">
                                    <Mail size={18} />
                                    Email
                                </div>
                            </th>
                            <th className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={18} />
                                    Position
                                </div>
                            </th>
                            <th className={`px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <Loader size={24} className="animate-spin text-indigo-600" />
                                        <span className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Loading employees...
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredEmployees.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        No employees found
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredEmployees.map((emp, index) => (
                                <EmployeeRow key={emp.id} emp={emp} index={index} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeTable;