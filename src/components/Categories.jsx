import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCategoryId, changePage } from '../redux/slices/filterSlice'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые'
]

function Categories() {
	const categoryId = useSelector(state => state.filter.categoryId)
	const dispatch = useDispatch()


	const onSelectCategory = (index) => {
		dispatch(changeCategoryId(index))
		dispatch(changePage(1))
	}

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => (
					<li
						key={category}
						className={categoryId === index ? 'active' : ''}
						onClick={() => onSelectCategory(index)}
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
