import ReactPaginate from 'react-paginate';
import {BsChevronRight,BsChevronLeft} from 'react-icons/bs'
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';

export default function PaginationButton({setCurrentPage,currentPage,totalPages}) {
    const handlePageClick=({selected})=>{
        setCurrentPage(selected);
    }    
    const paginationVariants={
        hidden:{
            opacity:0,
            y:200,
        },
        visible:{
            opacity:1,
            y:0,
            transition:{
                type:"spring",
                stiffness:260,
                damping:20,
                duration:1
            }
        }
    }

    const showNextButton=currentPage !==totalPages-1;
    const showPrevButton=currentPage !== 0;

return (
    <motion.div variants={paginationVariants} initial="hidden" animate="visible">
        <ReactPaginate
            breakLabel={
                <span className='mr-4'>...</span>
            }
            // nextLabel="next >"
            onPageChange={handlePageClick}
            nextLabel={
                showNextButton? (
                    <span className=' w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md mr-4'>
                        <BsChevronRight/>
                    </span>
                ) :null
            }
            pageRangeDisplayed={3}
            pageCount={totalPages}
            previousLabel={
                showPrevButton ? (
                    <span className=' w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md mr-4'>
                        <BsChevronLeft/>
                    </span>
                ):null
            }
            containerClassName='flex item-center justify-center mt-3 mb-1'
            pageClassName='block border border-solid border-gray-50 p-1 px-3 hover:bg-gray-200 flex items-center justify-center rounded-full'
            activeClassName='bg-purple-200 text-gray-400'
        />
    </motion.div>
)
}

PaginationButton.propTypes = {
    // setCurrentPage: PropTypes.fu.isRequired,
    currentPage:PropTypes.number.isRequired,
    totalPages:PropTypes.number.isRequired,
    setCurrentPage:PropTypes.func
};
