import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPizza } from '../../../models/IPizza'

export const pizzasApi = createApi({
	reducerPath: 'pizzasApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'pizzas.json' }),
	endpoints: (build) => ({
		getPizzas: build.query<IPizza[], string>({
			query: () => '',
		}),
	}),
})

export const { useGetPizzasQuery } = pizzasApi
