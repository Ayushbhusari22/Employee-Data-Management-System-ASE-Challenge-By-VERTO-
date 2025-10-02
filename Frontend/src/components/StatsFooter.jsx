import { useContext } from "react";
import { EmployeeContext } from "./EmployeeManagement";

function StatsFooter () {
    const { employees, filteredEmployees, theme } = useContext(EmployeeContext);
    const isDark = theme === 'dark';

    return (
        <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600 shadow-md'
            }`}>
            <div className="flex justify-between items-center">
                <span className="text-sm">
                    Showing <span className="font-semibold">{filteredEmployees.length}</span> of{' '}
                    <span className="font-semibold">{employees.length}</span>
                </span>
                <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
            </div>
        </div>
    );
}

export default StatsFooter;