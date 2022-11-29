import { FC } from 'react'

import { useAppDispatch } from '../../hooks'

import { plusPizza, minusPizza, deletePizza } from '../../redux/reducers'

import type { ICartPizza } from '../../models'

import MinusBtn from '../../assets/img/MinusBtn'
import PlusBtn from '../../assets/img/PlusBtn'
import DeleteItemBtn from '../../assets/img/DeleteItemBtn'
import styles from './CartPizza.module.scss'

interface CartPizzaProps {
	pizza: ICartPizza
}

export const CartPizza: FC<CartPizzaProps> = ({ pizza }) => {
	const { id, icon, title, type, size, count, price, defaultPrice } = pizza

	const dispatch = useAppDispatch()

	const handlerPlusCount = () => {
		dispatch(plusPizza({ id, price: defaultPrice, type, size, title }))
	}

	const handlerMinusCount = () => {
		dispatch(minusPizza({ id, price: defaultPrice, type, size, title }))
	}

	const handlerDeleteButton = () => {
		dispatch(deletePizza({ id, type, size }))
	}

	const changeType = (type: number) => (type ? 'традиционное' : 'тонкое')

	return (
		<div className={styles.cart__item}>
			<div className={styles.cart__itemImg}>
				<img className={styles.pizzaBlock__image} src={icon} alt="Pizza" />
			</div>
			<div className={styles.cart__itemInfo}>
				<h3>{title}</h3>
				<p>
					{changeType(type)}, {size} см.
				</p>
			</div>
			<div className={styles.cart__itemCount}>
				<button
					onClick={handlerMinusCount}
					className={`button button--outline button--circle ${styles.cart__itemCountMinus}`}
					disabled={count <= 1}
				>
					<MinusBtn />
				</button>
				<b>{count}</b>
				<div
					onClick={handlerPlusCount}
					className={`button button--outline button--circle`}
				>
					<PlusBtn />
				</div>
			</div>
			<div className={styles.cart__itemPrice}>
				<b>{price} ₽</b>
			</div>
			<div className={styles.cart__itemRemove}>
				<div
					onClick={handlerDeleteButton}
					className={`button button--outline button--circle ${styles.button}`}
				>
					<DeleteItemBtn />
				</div>
			</div>
		</div>
	)
}
