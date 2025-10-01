import React, { useContext } from "react";
import { EmployeeContext } from "../App";
import { Search, Plus } from "lucide-react";

function SearchBar () {
    const { searchName, setSearchName, setIsFormOpen } = useContext(EmployeeContext);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>
            <button
                onClick={() => setIsFormOpen(true)}
                className="ml-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
                <Plus className="inline w-5 h-5 mr-2" />
                Add Employee
            </button>
        </div>
    );
}

export default SearchBar;