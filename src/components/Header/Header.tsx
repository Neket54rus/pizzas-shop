import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../hooks'

import CartIcon from '../../assets/img/CartIcon'
import pizzaLogoSvg from '../../assets/img/pizza-logo2.png'
import styles from './Header.module.scss'

export const Header: FC = () => {
	const fullPrice = useAppSelector((state) => state.cart.fullPrice)
	const count = useAppSelector((state) => state.cart.count)

	return (
		<div className={styles.header}>
			<div className={`container ${styles.container}`}>
				<Link to="/pizzas" className={styles.header__logo}>
					<img height="100" src={pizzaLogoSvg} alt="Pizza logo" />
					<div>
						<h1>Pizza 399</h1>
						<p>Самая вкусная пицца в мире</p>
					</div>
				</Link>
				<div className={styles.header__cart}>
					<Link to="/cart" className="button button--cart">
						<span className="button--cart-price">{fullPrice} ₽</span>
						<div className="button__delimiter button--cart-delimiter"></div>
						<CartIcon />
						<span className="button--cart-count">{count}</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
