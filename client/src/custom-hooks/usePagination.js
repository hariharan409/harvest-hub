import { useState } from "react";


const usePagination = (list) => {
    // pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    // slice the list for pagination
    const offset = currentPage * itemsPerPage;
    const currentItems = list.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(list.length / itemsPerPage);

    // handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return { currentItems, pageCount, offset, handlePageChange };

}

export default usePagination;