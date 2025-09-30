import React, { useContext } from "react";
import { EmployeeContext } from "../App";
import SearchBar from "./SearchBar";
import EmployeeForm from "./EmployeeForm";
import EmployeeRow from "./EmployeeRow";
import EmployeeTable from "./EmployeeTable";
import StatsFooter from "./StatsFooter";
import Alert from "./Alert";

function EmployeeManagement () {
    const { isFormOpen, error, success, setError, setSuccess } = useContext(EmployeeContext);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <h1 className="text-3xl font-bold mb-4">Employee Management</h1>

            <Alert type="success" message={success} onClose={() => setSuccess("")} />
            <Alert type="error" message={error} onClose={() => setError("")} />

            <SearchBar />
            {isFormOpen && <EmployeeForm />}
            <EmployeeTable />
            <StatsFooter />
        </div>
    );
}

export default EmployeeManagement;
