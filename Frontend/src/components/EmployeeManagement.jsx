import { useState, useEffect, createContext } from "react";
import SearchBar from "./SearchBar";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import StatsFooter from "./StatsFooter";
import Alert from "./Alert";
import { Plus } from "lucide-react";
import employeeAPI from "../EmployeeService";

export const EmployeeContext = createContext();

function EmployeeManagement () {
    const [employees, setEmployees] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [theme, setTheme] = useState('dark');
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const isDark = theme === 'dark';

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const data = await employeeAPI.getAll();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setError("Failed to load employees. Using demo data.");
                // Fallback to mock data if API fails
                setEmployees([
                    { id: 1, name: 'John Doe', email: 'john.doe@company.com', position: 'Senior Developer' },
                    { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', position: 'Product Manager' },
                ]);
                setTimeout(() => setError(''), 3000);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchName.toLowerCase())
        // emp.email.toLowerCase().includes(searchName.toLowerCase()) ||
        // emp.position.toLowerCase().includes(searchName.toLowerCase()
    );

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    const contextValue = {
        employees,
        setEmployees,
        filteredEmployees,
        searchName,
        setSearchName,
        isFormOpen,
        setIsFormOpen,

        loading, setLoading,
        editingEmployee,
        setEditingEmployee,
        deleting, setDeleting,
        error,
        setError,
        success,
        setSuccess,
        theme,
        setTheme,
        loading
    };

    return (
        <EmployeeContext.Provider value={contextValue}>
            <div className={`min-h-screen p-8 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
                }`}>
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'
                                }`}>
                                Employee Management
                            </h1>
                            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {filteredEmployees.length} {filteredEmployees.length === 1 ? 'employee' : 'employees'} found
                            </p>
                        </div>

                        <div className="flex gap-3 res-buttons">
                            <button
                                onClick={toggleTheme}
                                className={`button px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isDark
                                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                                    }`}
                            >

                                {/* For Mobile */}
                                <span className="block sm:hidden">
                                    {isDark ? '☀️' : '🌙'}
                                </span>

                                {/* For desktop */}
                                <span className="hidden sm:block">
                                    {isDark ? '☀️ Light' : '🌙 Dark'}
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    setEditingEmployee(null);
                                    setIsFormOpen(!isFormOpen);
                                }}
                                className={`button px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${isDark
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                <Plus size={20} />

                                {/* For desktop */}
                                <span className="hidden sm:inline">
                                    Add Employee
                                </span>
                            </button>
                        </div>
                    </div>

                    <Alert type="success" message={success} onClose={() => setSuccess('')} />
                    <Alert type="error" message={error} onClose={() => setError('')} />

                    <SearchBar />
                    {isFormOpen && <EmployeeForm />}
                    <EmployeeTable />
                    <StatsFooter />
                </div>

                <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 620px) {
          .res-buttons {
            width: 20%;
            flex-direction: column;
          }
          }
        `}</style>
            </div>
        </EmployeeContext.Provider>
    );
}

export default EmployeeManagement;