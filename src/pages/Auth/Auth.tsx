import { FC } from "react"
import { Link } from "react-router-dom"

import styles from "./Auth.module.scss"

export const Auth: FC = () => {
	return (
		<div className={styles.Auth}>
			<div className={styles.Auth__title}>Авторизация</div>
			<form>
				<input type="text" placeholder="Введите логин" />
				<input type="password" placeholder="Введите пароль" />
			</form>
			<div className={styles.Auth__btns}>
				<Link to="/registration">Нет аккаунта?</Link>
				<button className="button">Войти</button>
			</div>
		</div>
	)
}
