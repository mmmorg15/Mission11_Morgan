// Renders page navigation plus the page-size and sort controls for the catalog.
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    sortByTitle: boolean;
    onSortByTitleChange: (sort: boolean) => void;
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange, sortByTitle, onSortByTitleChange }: PaginationProps) => {
    return(
        <div className="flex item-center justify-center mt-4">
            <div className="book-list__pagination mb-3">
            <button
                className="btn btn-outline-primary me-2 mb-2"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                className={`btn mb-2 me-2 ${
                    currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'
                }`}
                key={index + 1}
                onClick={() => onPageChange(index + 1)}
                >
                {index + 1}
                </button>
            ))}

            <button
                className="btn btn-outline-primary mb-2"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
            </div>

            <div className="book-list__controls d-flex flex-wrap gap-3 align-items-center">
            <label className="form-label mb-0">
                Results per page:
                <select
                className="form-select ms-2 d-inline-block w-auto"
                value={pageSize}
                onChange={(event) => {
                    onPageSizeChange(Number(event.target.value));
                    onPageChange(1);
                }}
                >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                </select>
            </label>

            <label className="form-label mb-0">
                Sort by title:
                <select
                className="form-select ms-2 d-inline-block w-auto"
                value={sortByTitle ? 'title' : 'default'}
                onChange={(event) => {
                    onSortByTitleChange(event.target.value === 'title');
                    onPageChange(1);
                }}
                >
                <option value="default">Default</option>
                <option value="title">Title (A-Z)</option>
                </select>
            </label>
            </div>
        </div>
        
    );

}

export default Pagination;
