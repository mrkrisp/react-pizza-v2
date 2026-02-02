import debounce from 'lodash.debounce'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import searchIcon from '../../assets/images/searchIcon.svg'
import { setSearchValue } from '../../redux/slices/filterSlice'
import s from './Search.module.scss'

function Search() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const updateSearchValue = useCallback(
    debounce(str => {
      dispatch(setSearchValue(str))
    }, 1000),
    []
  )

  const onChangeInput = e => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  return (
    <div className={s.root}>
      <img
        className={s.icon}
        src={searchIcon}
        alt="search"
      />
      <input
        value={value}
        onChange={onChangeInput}
        type="search"
        placeholder="Поиск..."
      />
    </div>
  )
}

export default Search
