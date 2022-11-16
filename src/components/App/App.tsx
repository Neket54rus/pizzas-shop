import { FC, useEffect } from 'react'

import { fetchPizzas } from '../../redux/asyncActions'
import { useAppDispatch } from '../../hooks'

import { AppRouter, Header, ScrollTop } from '../'
import styles from './App.module.scss'

export const App: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchPizzas())
	}, [])

	return (
		<div className={styles.wrapper}>
			<Header />
			<AppRouter />
			<ScrollTop />
		</div>
	)
}
