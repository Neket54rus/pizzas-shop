import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { CategoriesState } from "./types"

const initialState: CategoriesState = {
	activeCategory: 0,
}

export const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setActiveCategory: (state, action: PayloadAction<number>) => {
			state.activeCategory = action.payload
		},
	},
})

export const { setActiveCategory } = categoriesSlice.actions
export const { reducer: categoriesReducer } = categoriesSlice
