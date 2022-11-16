import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartState } from './types'
import type { ICartPizza } from '../../../models'

const initialState: CartState = {
	fullPrice: JSON.parse(localStorage.getItem('price')!) || 0,
	count: JSON.parse(localStorage.getItem('count')!) || 0,
	pizzas: JSON.parse(localStorage.getItem('cart')!) || ([] as ICartPizza[]),
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		plusFullPrice: (state, action: PayloadAction<number>) => {
			state.fullPrice += action.payload
			localStorage.setItem('price', JSON.stringify(state.fullPrice))
		},
		plusCount: (state, action: PayloadAction<number>) => {
			state.count += action.payload
			localStorage.setItem('count', JSON.stringify(state.count))
		},
		addPizza: (state, action: PayloadAction<ICartPizza>) => {
			const findPizza = state.pizzas.find(
				(pizza) =>
					pizza.id === action.payload.id &&
					pizza.type === action.payload.type &&
					pizza.size === action.payload.size,
			)

			if (findPizza) {
				findPizza.count++
				findPizza.price += action.payload.price
				localStorage.setItem('cart', JSON.stringify(state.pizzas))
			} else {
				state.pizzas = [...state.pizzas, action.payload]
				localStorage.setItem('cart', JSON.stringify(state.pizzas))
			}
		},
		plusPizza: (
			state,
			action: PayloadAction<{ id: number; price: number }>,
		) => {
			state.pizzas = state.pizzas.map((pizza) =>
				pizza.id === action.payload.id
					? {
							...pizza,
							count: pizza.count + 1,
							price: pizza.price + action.payload.price,
					  }
					: pizza,
			)
			state.fullPrice = state.fullPrice + action.payload.price
			state.count = state.count + 1
			localStorage.setItem('price', JSON.stringify(state.fullPrice))
			localStorage.setItem('count', JSON.stringify(state.count))
		},
		minusPizza: (
			state,
			action: PayloadAction<{ id: number; price: number }>,
		) => {
			state.pizzas = state.pizzas.map((pizza) =>
				pizza.id === action.payload.id
					? {
							...pizza,
							count: pizza.count - 1,
							price: pizza.price - action.payload.price,
					  }
					: pizza,
			)
			state.fullPrice = state.fullPrice - action.payload.price
			state.count = state.count - 1
			localStorage.setItem('price', JSON.stringify(state.fullPrice))
			localStorage.setItem('count', JSON.stringify(state.count))
		},
		deletePizza: (
			state,
			action: PayloadAction<{ id: number; type: number; size: number }>,
		) => {
			state.pizzas = state.pizzas.filter((pizza) => {
				if (
					pizza.id === action.payload.id &&
					pizza.type === action.payload.type &&
					pizza.size === action.payload.size
				) {
					state.count = state.count - pizza.count
					state.fullPrice = state.fullPrice - pizza.price
				} else {
					return pizza
				}
			})

			localStorage.setItem('cart', JSON.stringify(state.pizzas))
			localStorage.setItem('price', JSON.stringify(state.fullPrice))
			localStorage.setItem('count', JSON.stringify(state.count))
		},
		clearCart: (state) => {
			state.pizzas = []
			state.fullPrice = 0
			state.count = 0
			localStorage.setItem('cart', JSON.stringify([]))
			localStorage.setItem('price', JSON.stringify(state.fullPrice))
			localStorage.setItem('count', JSON.stringify(state.count))
		},
	},
})

export const {
	plusFullPrice,
	plusCount,
	addPizza,
	plusPizza,
	minusPizza,
	deletePizza,
	clearCart,
} = cartSlice.actions
export const { reducer: cartReducer } = cartSlice
