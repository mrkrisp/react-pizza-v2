import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности',
		sortProperty: 'rating'
	},
	orderType: 'desc',
	currentPage: 1
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		changeCategoryId(state, action) {
			state.categoryId = action.payload 
		},
		changeSort(state, action) {
			state.sort = action.payload
		},
		changeOrderType(state, action) {
			state.orderType = action.payload
		},
		changePage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.sort = action.payload.sort
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
			state.orderType = action.payload.orderType
			
		}
	}
})

export const { changeCategoryId, changeSort, changeOrderType, changePage, setFilters } = filterSlice.actions

export default filterSlice.reducer