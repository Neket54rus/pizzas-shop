import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { addPizza, plusCount, plusFullPrice } from '../../redux/reducers'

import { useAppDispatch } from '../../hooks'

import type { ICartPizza,IPizza } from '../../models'

import PlusIcon from '../../assets/img/PlusIcon'
import styles from './PizzaBlock.module.scss'

export const PizzasBlock: FC<IPizza> = ({
	id,
	imageUrl,
	title,
	types,
	price: defaultPrice,
	sizes,
}) => {
	const dispatch = useAppDispatch()

	const [activeType, setActiveType] = useState(types[0])
	const [activeSize, setActiveSize] = useState(sizes[0])
	const [price, setPrice] = useState(defaultPrice)
	const [count, setCount] = useState(
		JSON.parse(localStorage.getItem('cart')!)
			?.filter((pizza: ICartPizza) => pizza.id === id)
			.reduce((total: number, pizza: ICartPizza) => {
				return total + pizza.count
			}, 0),
	)

	const handlerTypeItem = (type: number) => () => setActiveType(type)

	const handlerSizeItem = (size: number) => () => {
		setActiveSize(size)
		setPrice(
			Math.floor(
				size === 30
					? defaultPrice * 1.2
					: size === 40
					? defaultPrice * 1.5
					: defaultPrice,
			),
		)
	}

	const handlerAddButton = () => {
		setCount((count: number) => count + 1)
		dispatch(plusFullPrice(price))
		dispatch(plusCount(1))
		dispatch(
			addPizza( {
				id,
				count: 1,
				title,
				price,
				defaultPrice: price,
				icon: imageUrl,
				size: activeSize,
				type: activeType,
			}),
		)
	}

	const typesList = types.map((type) => (
		<li
			onClick={handlerTypeItem(type)}
			className={type === activeType ? styles.active : ''}
			key={type}
		>
			{type ? 'традиционное' : 'тонкое'}
		</li>
	))

	const sizesList = sizes.map((size) => (
		<li
			onClick={handlerSizeItem(size)}
			className={size === activeSize ? styles.active : ''}
			key={size}
		>
			{size} см.
		</li>
	))

	return (
		<div className={styles.pizzaBlock}>
			<Link to={`/pizzas/${id}`}>
				<img
					className={styles.pizzaBlock__image}
					src={imageUrl}
					alt="Pizza"
				/>
				<h4 className={styles.pizzaBlock__title}>{title}</h4>
			</Link>
			<div className={styles.pizzaBlock__selector}>
				<ul>{typesList}</ul>
				<ul>{sizesList}</ul>
			</div>
			<div className={styles.pizzaBlock__bottom}>
				<div className={styles.pizzaBlock__price}>{price} ₽</div>
				<div
					onClick={handlerAddButton}
					className="button button--outline button--add"
				>
					<PlusIcon />
					<span>Добавить</span>
					{!!count && <i>{count}</i>}
				</div>
			</div>
		</div>
	)
}
