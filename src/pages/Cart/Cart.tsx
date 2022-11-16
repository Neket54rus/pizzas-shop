import {FC, useState} from 'react'
import { Link } from 'react-router-dom'

import { clearCart } from '../../redux/reducers'

import { useAppDispatch, useAppSelector } from '../../hooks'

import { CartPizza, EmptyCart, PayModal } from '../../components'

import CartIcon from '../../assets/img/CartIcon'
import ClearCartBtn from '../../assets/img/ClearCartBtn'
import BackBtn from '../../assets/img/BackBtn'
import styles from './Cart.module.scss'

export const Cart: FC = () => {
	const dispatch = useAppDispatch()

	const { pizzas, fullPrice, count } = useAppSelector((state) => state.cart)

	const [modalActive, setModalActive] = useState(false)

	const handlerClearCart = () => dispatch(clearCart())

	const handlerPayButton = () => setModalActive(true)

	const pizzasList = pizzas.map((pizza, index) => (
		<CartPizza key={index} pizza={pizza} />
	))

	if (pizzas.length === 0) {
		return <EmptyCart />
	}

	return (
		<>
			<div className="content">
				<div className={`container ${styles.containerCart}`}>
					<div className={styles.cart}>
						<div className={styles.cart__top}>
							<h2 className={`content__title ${styles.content__title}`}>
								<CartIcon />
								Корзина
							</h2>
							<div
								onClick={handlerClearCart}
								className={styles.cart__clear}
							>
								<ClearCartBtn />
								<span>Очистить корзину</span>
							</div>
						</div>
						<div
							style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}
							className="content__items"
						>
							{pizzasList}
						</div>
						<div className={styles.cart__bottom}>
							<div className={styles.cart__bottomDetails}>
								<span>
									Всего пицц: <b>{count} шт.</b>
								</span>
								<span>
									Сумма заказа: <b>{fullPrice} ₽</b>
								</span>
							</div>
							<div className={styles.cart__bottomButtons}>
								<Link
									to="/pizzas"
									className={`button button--outline button--add ${styles.goBackBtn}`}
								>
									<BackBtn />
									<span>Вернуться назад</span>
								</Link>
								<div onClick={handlerPayButton} className={`button ${styles.payBtn}`}>
									<span>Оплатить сейчас</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<PayModal active={modalActive} setActive={() => setModalActive(false)} />
		</>
	)
}
