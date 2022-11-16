import { createSlice } from '@reduxjs/toolkit'

import { fetchPizzas } from '../../asyncActions'

import type { IPizza } from '../../../models'
import type { PizzasState } from './types'

const initialState: PizzasState = {
	pizzas: [] as IPizza[],
}

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {},
	extraReducers: (build) => {
		build.addCase(fetchPizzas.pending, (state) => {})
		build.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.pizzas = action.payload
		})
		build.addCase(fetchPizzas.rejected, (state) => {})
	},
})

export const { reducer: pizzasReducer } = pizzasSlice
