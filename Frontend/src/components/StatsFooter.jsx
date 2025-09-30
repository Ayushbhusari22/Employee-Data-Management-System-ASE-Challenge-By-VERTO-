import React, { useContext } from "react";
import { EmployeeContext } from "../App";

function StatsFooter () {
    const { employees } = useContext(EmployeeContext);
    return (
        <p className="mt-4 text-center text-gray-500">
            Total Employees : {employees.length}
        </p>
    );
}

export default StatsFooter;