import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { SortsState } from "./types"

const initialState: SortsState = {
	activeSort: 0,
}

export const sortsSlice = createSlice({
	name: "sorts",
	initialState,
	reducers: {
		setActiveSort: (state, action: PayloadAction<number>) => {
			state.activeSort = action.payload
		},
	},
})

export const { setActiveSort } = sortsSlice.actions
export const { reducer: sortsReducer } = sortsSlice
