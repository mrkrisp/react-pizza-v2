import React, { useCallback, useContext, useState } from 'react'
import s from './Search.module.scss'
import searchIcon from '../../assets/images/searchIcon.svg'
import debounce from 'lodash.debounce'
import { SearchContext } from '../../App'

function Search() {
	const [value, setValue] = useState('')
	const {setSearchValue} = useContext(SearchContext)

	const updateSearchValue = useCallback(
		debounce((str) => {
			setSearchValue(str)
		}, 1000), 
	[])

	const onChangeInput = (e) => {
		setValue(e.target.value)
		updateSearchValue(e.target.value)
	}

	return (
		<div className={s.root}>
			<img className={s.icon} src={searchIcon} alt="search" />
			<input value={value} onChange={onChangeInput} type="search" placeholder='Поиск...' />
		</div>
	)
}

export default Search
