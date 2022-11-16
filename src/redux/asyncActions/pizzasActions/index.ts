import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import type { IPizza } from '../../../models'

export const fetchPizzas = createAsyncThunk<IPizza[]>(
	'pizzas/fetchPizzas',
	async () => {
		const { data } = await axios.get<IPizza[]>('pizzas.json')
		return data
	},
)
