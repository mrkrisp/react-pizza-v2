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
		}
	}
})

export const { changeCategoryId, changeSort, changeOrderType, changePage } = filterSlice.actions

export default filterSlice.reducer