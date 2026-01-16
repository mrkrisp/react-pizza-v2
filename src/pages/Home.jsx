import axios from 'axios'
import qs from 'qs'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import PizzaSkeleton from '../components/PizzaBlock/Skeleton'
import Sort, { sortTypes } from '../components/Sort'
import { setFilters } from '../redux/slices/filterSlice'
import { useUpdateEffect } from '@custom-react-hooks/use-update-effect'

function Home() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	
	const fetchPizzas = () => {
		setIsLoading(true)

		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios
			.get(
				`https://695dccc62556fd22f6767291.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortProperty}&order=${orderType}${search}`
			)
			.then(res => setPizzas(res.data))
			.finally(() => setIsLoading(false))
			.catch(err => console.error(err))
	}

	const { categoryId, sort, orderType, currentPage } = useSelector(
		state => state.filter
	)
	const sortProperty = sort.sortProperty
	const { searchValue } = useContext(SearchContext)

	const [pizzas, setPizzas] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	// Если изменили параметры и был первый рендер
	useUpdateEffect(() => {
		const queryString = qs.stringify({
			categoryId,
			sortProperty,
			currentPage,					
			orderType
		})
		navigate(`?${queryString}`)
	}, [categoryId, sortProperty, orderType, currentPage])
	
	// Если был первый рендер, то проверяем URL-параметры и сохраняем в redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))

			const sort = sortTypes.find(s => s.sortProperty === params.sortProperty)

			dispatch(
				setFilters({
					...params,
					sort
				})
			)
			isSearch.current = true
		}
	}, [])

	
  // Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			fetchPizzas()
		}

		isSearch.current = false
	}, [categoryId, sortProperty, orderType, searchValue, currentPage])

	

	return (
		<div className="container">
			<div className="content">
				<div className="content__top">
					<Categories />
					<Sort />
				</div>
				<h2 className="content__title">Все пиццы</h2>

				<div className="content__items">
					{isLoading
						? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
						: pizzas.map(pizza => (
								<PizzaBlock
									key={pizza.id}
									title={pizza.title}
									price={pizza.price}
									sizes={pizza.sizes}
									types={pizza.types}
									imageUrl={pizza.imageUrl}
								/>
						  ))}
				</div>
				<Pagination pageCount={3} />
			</div>
		</div>
	)
}

export default Home
