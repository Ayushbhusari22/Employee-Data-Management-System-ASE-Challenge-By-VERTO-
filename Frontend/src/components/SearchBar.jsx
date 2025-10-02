import { useContext } from "react";
import { EmployeeContext } from "./EmployeeManagement";
import { Search } from "lucide-react";

function SearchBar () {
    const { searchName, setSearchName, theme } = useContext(EmployeeContext);
    const isDark = theme === 'dark';

    return (
        <div className="mb-6">
            <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'
                    }`} size={20} />
                <input
                    type="text"
                    placeholder="Search by name, email, or position..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${isDark
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500'
                        : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-500 shadow-sm'
                        } outline-none`}
                />
            </div>
        </div>
    );
}
export default SearchBar;