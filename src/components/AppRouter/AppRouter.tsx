import { Route, Routes } from 'react-router-dom'

import { publicRoutes } from '../../router'

export const AppRouter = () => {
	return (
		<Routes>
			{publicRoutes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={route.element}
				/>
			))}
		</Routes>
	)
}
