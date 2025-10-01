import React, { useState, createContext, useEffect } from "react";
import EmployeeManagement from "./components/EmployeeManagement";
import { getEmployees } from "./EmployeeService";

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
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getEmployees();
        console.log(data);
        
        setEmployees(Array.isArray(data) ? data : data.employees);
      } catch {
        setError("Failed to load employees frok server");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const providerValues = {
    employees, setEmployees,
    filteredEmployees, setFilteredEmployees,
    searchName, setSearchName,
    isFormOpen, setIsFormOpen,
    editingForm, setEditingForm,
    loading, setLoading,
    error, setError,
    success, setSuccess,
    sortOrder, setSortOrder
  };

  return (
    <EmployeeContext.Provider value={providerValues}>
        <EmployeeManagement />
    </EmployeeContext.Provider>
  );
}

export default App;
