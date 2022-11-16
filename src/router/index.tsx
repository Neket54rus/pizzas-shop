import { Navigate } from 'react-router-dom'

import { Cart, Home } from '../pages'

export enum RoutesLink {
	pizzas = '/pizzas',
	cart = '/cart',
	pizza = '/pizzas/id',
}

export const publicRoutes = [
	{ path: RoutesLink.pizzas, element: <Home /> },
	{ path: RoutesLink.cart, element: <Cart /> },
	{ path: '*', element: <Navigate to={RoutesLink.pizzas} /> },
]
