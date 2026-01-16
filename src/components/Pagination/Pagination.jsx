import React from 'react'
import ReactPaginate from 'react-paginate'
import s from './Pagination.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../../redux/slices/filterSlice'


const Pagination = ({pageCount}) => {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.filter.currentPage)
	return (
		<ReactPaginate
				className={s.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={e => dispatch(changePage(e.selected + 1))}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={currentPage-1}
      />
	)
}

export default Pagination
