import React, { useContext } from "react";
import { EmployeeContext } from "../App";
import { Search, Plus } from "lucide-react";

function SearchBar () {
    const { searchName, setSearchName, setIsFormOpen } = useContext(EmployeeContext);

    return (
        <></>
    )
}

export default SearchBar;