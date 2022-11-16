import { configureStore } from '@reduxjs/toolkit'

import {
	cartReducer,
	categoriesReducer,
	pizzasReducer,
	sortsReducer,
} from './reducers'

export const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		sorts: sortsReducer,
		cart: cartReducer,
		pizzas: pizzasReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
