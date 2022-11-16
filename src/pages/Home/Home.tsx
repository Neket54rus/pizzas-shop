import { FC } from 'react'

import { useAppSelector } from '../../hooks'

import { Categories, SortPopup, PizzasBlock } from '../../components'

export const Home: FC = () => {
	const pizzas = useAppSelector((state) => state.pizzas.pizzas)
	const activeCategory = useAppSelector(
		(state) => state.categories.activeCategory,
	)
	const activeSort = useAppSelector((state) => state.sorts.activeSort)

	const filteredPizzas = activeCategory
		? pizzas.filter((pizza) => pizza.category === activeCategory)
		: pizzas

	const sortedPizzas = [...filteredPizzas].sort((firstPizza, secondPizza) => {
		if (activeSort === 1) {
			return secondPizza.price - firstPizza.price
		}

		if (activeSort === 2) {
			return firstPizza.title.localeCompare(secondPizza.title)
		}

		return secondPizza.rating - firstPizza.rating
	})

	const pizzasList = sortedPizzas.map((pizza) => (
		<PizzasBlock key={pizza.id} {...pizza} />
	))

	return (
		<div className="content">
			<div className="container">
				<div className="content__top">
					<Categories />
					<SortPopup />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">{pizzasList}</div>
			</div>
		</div>
	)
}
