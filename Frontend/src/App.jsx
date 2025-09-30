import React, { useState, createContext } from "react";
import EmployeeManagement from "./components/EmployeeManagement";

export const EmployeeContext = createContext();

function App () {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const providerValues = {
    employees, setEmployees,
    filteredEmployees, setFilteredEmployees,
    searchName, setSearchName,
    isFormOpen, setIsFormOpen,
    editingForm, setEditingForm,
    loading, setLoading,
    error, setError,
    success, setSuccess,
  };

  return (
    <EmployeeContext.Provider value={providerValues}>
      <div className="app">
        <EmployeeManagement />
      </div>
    </EmployeeContext.Provider>
  );
}

export default App;
