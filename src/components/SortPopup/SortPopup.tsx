import { FC, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { setActiveSort } from '../../redux/reducers'

import ArrowIcon from '../../assets/img/ArrowIcon'
import styles from './SortPopup.module.scss'

export const SortPopup: FC = () => {
	const sorts = ['Сначала популярные', 'Сначала недорогие', 'Сначала дорогие']

	const dispatch = useAppDispatch()

	const activeSort = useAppSelector((state) => state.sorts.activeSort)

	const [isVisible, setVisible] = useState(false)

	const handlerLabel = () => {
		setVisible((isVisible) => !isVisible)
	}

	const handlerSortItem = (index: number) => () => {
		dispatch(setActiveSort(index))
		setVisible(false)
	}

	const activeStyleSort = (index: number) =>
		index === activeSort ? styles.active : ''

	const sortsList = sorts.map((item, index) => (
		<li
			key={item}
			onClick={handlerSortItem(index)}
			className={activeStyleSort(index)}
		>
			{item}
		</li>
	))

	return (
		<div className={styles.sort}>
			<div onClick={handlerLabel} className={styles.sort__label}>
				<ArrowIcon visible={isVisible} />
				<b>Сортировка:</b>
				<span>{sorts[activeSort]}</span>
			</div>
			{isVisible ? (
				<div className={styles.sort__popup}>
					<ul>{sortsList}</ul>
				</div>
			) : null}
		</div>
	)
}
