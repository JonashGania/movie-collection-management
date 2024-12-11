import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationPrevious, 
    PaginationNext 
} from "./ui/pagination"

interface PaginationComponentProps {
    totalPages: number,
    currentPage: number,
    onPageChange: (page: number) => void,
}

const PaginationComponent = ({ totalPages, currentPage, onPageChange }: PaginationComponentProps) => {

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        className={`${currentPage === 1 ? 'pointer-events-none opacity-60' : ''} text-white text-lg hover:text-white  hover:bg-[rgba(71,85,105,0.3)] cursor-pointer`}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                </PaginationItem>

                { Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem>
                        <button 
                            className={`text-white px-4 py-2 border hover:bg-[rgba(71,85,105,0.3)] rounded-md ${currentPage === page ? 'border-[rgba(102,102,102,0.3)]' : 'border-transparent'}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext 
                        className={`${currentPage === totalPages ? 'pointer-events-none opacity-60' : ''} text-white text-lg hover:text-white hover:bg-[rgba(71,85,105,0.3)] cursor-pointer`}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationComponent