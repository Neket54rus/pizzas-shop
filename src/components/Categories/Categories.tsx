import { FC, useState } from 'react'

import { useAppDispatch } from '../../hooks'
import { useAppSelector } from '../../hooks'
import { setActiveCategory } from '../../redux/reducers'

import styles from './Categories.module.scss'

export const Categories: FC = () => {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	const dispatch = useAppDispatch()

	const activeCategory = useAppSelector(
		(state) => state.categories.activeCategory,
	)

	const [visible, setVisible] = useState(false)

	const handlerCategoryItem = (index: number) => () => {
		dispatch(setActiveCategory(index))
		setVisible(false)
	}

	const activeStyleCategory = (index: number) =>
		activeCategory === index ? styles.active : ''

	const mobileCategoriesList = (
		<>
			{categories.map((item, index) =>
				index === activeCategory ? (
					<div
						onClick={() => setVisible((visible) => !visible)}
						key={item}
						className={styles.categoriesMobileItemList}
					>
						{item}
					</div>
				) : (
					<li
						key={item}
						onClick={handlerCategoryItem(index)}
						className={`${activeStyleCategory(index)} ${
							visible && styles.visible
						}`}
					>
						{item}
					</li>
				),
			)}
		</>
	)

	return (
		<div className={styles.categories}>
			<ul>{mobileCategoriesList}</ul>
		</div>
	)
}
