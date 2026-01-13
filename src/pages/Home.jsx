import React, { useContext, useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import PizzaSkeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { SearchContext } from '../App'

function Home() {
	const {categoryId, sort, orderType, currentPage} = useSelector(state => state.filter) 
	const sortProperty = sort.sortProperty
	const {searchValue} = useContext(SearchContext)

	const [pizzas, setPizzas] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	

	useEffect(() => {
		setIsLoading(true)

		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		axios.get(
			`https://695dccc62556fd22f6767291.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortProperty}&order=${orderType}${search}`
		)
			.then(res => setPizzas(res.data) )
			.finally(() => setIsLoading(false))
			.catch((err) => console.error(err))
		window.scrollTo(0, 0)
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
