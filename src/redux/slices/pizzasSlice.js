import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
<<<<<<< HEAD
  items: [],
=======
  pizzas: [],
>>>>>>> 88181b3a07ef29fc1b7b6bfaae73a010e957d8be
  status: 'loading', // loading | success | error
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async params => {
    const { sortProperty, currentPage, orderType, category, search } = params

    const { data } = await axios.get(
      `https://695dccc62556fd22f6767291.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortProperty}&order=${orderType}${search}`
    )

    return data
  }
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(action, state) {
      state.items.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = 'success'
    })
    builder.addCase(fetchPizzas.pending, state => {
      state.status = 'loading'
      state.items = []
    })
    builder.addCase(fetchPizzas.rejected, state => {
      state.status = 'error'
      state.items = []
    })
  },
})

export const pizzasDataSelector = state => state.pizzas

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer
