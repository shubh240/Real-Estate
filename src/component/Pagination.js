import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

const Pagination = memo(function Pagination({ per_page, pageCount, onPageChange, page, lableName }) {
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState();
    const totalPages = Math.ceil(pageCount / per_page) || 4;

    useEffect(() => {
        setCurrentPage(page)
    }, [page]);

    const handlePageChange = (newPage) => {

        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            onPageChange(newPage);
        }
    };

    const renderPageItems = () => {

        const pageItems = [];
        const maxVisiblePages = 3;
        let startPage = currentPage - Math.floor(maxVisiblePages / 2);
        startPage = Math.max(startPage, 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        pageItems.push(
            <li className={`page-item active`}>
                {
                    currentPage == (totalPages + 1) - totalPages ? "" :
                        <button
                            className={`page-link font_18 active-button`}
                            style={{backgroundColor : "#0255A3"}}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            {t("Previous")}
                        </button>
                }
            </li>
        )

        for (let onepage = startPage; onepage <= endPage; onepage++) {
            const isDataAvailable = pageCount > 0;
            const isActive = currentPage === onepage;

            if (isDataAvailable) {

                const buttonClass = `page-link font_18 ${isActive ? 'active-button' : ''}`;
                const listItemClass = `page-item ${isActive ? 'active' : ''}`;

                pageItems.push(
                    <li key={onepage} className={listItemClass}>
                        <button
                            className={buttonClass}
                            onClick={() => !isActive && handlePageChange(onepage)}
                            disabled={isActive}
                            style={{backgroundColor : "#0255A3"}}
                        >
                            {onepage}
                        </button>
                    </li>
                );


            }
        }
        pageItems.push(
            <li className={`page-item active`}>
                {
                    currentPage >= totalPages ? "" :
                        <button
                            className={`page-link font_18 active-button`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            style={{backgroundColor : "#0255A3"}}
                        >
                            {t("Next")}
                        </button>
                }
            </li>
        )
        return pageItems;
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-4 col-lg-4 col-md-12">
                    <div className="mt-3 showing-results d-flex justify-content-between">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {/* <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}> */}
                                <a onClick={() => handlePageChange((totalPages + 1) - totalPages)}><i className="fa-solid fa-chevron-left"></i></a>
                                {/* </li> */}
                                {renderPageItems()}
                                <a onClick={() => handlePageChange(totalPages)} ><i className="fa-solid fa-chevron-right"></i></a>
                                {/* <a onClick={() => handlePageChange(currentPage + 1)} ><i className="fa-solid fa-chevron-double-right" style={{ color: "black" }}></i></a> */}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );

});

export default Pagination;
