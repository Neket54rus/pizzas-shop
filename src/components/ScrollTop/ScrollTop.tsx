import { FC, useEffect, useState } from 'react'

import arrowTop from '../../assets/img/arrow-top.svg'
import styles from './ScrollTop.module.scss'

export const ScrollTop: FC = () => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		window.onscroll = () => {
			if (window.scrollY > 500) {
				setVisible(true)
			} else {
				setVisible(false)
			}
		}
	}, [])

	return (
		<div
			onClick={() => window.scrollTo(0, 0)}
			className={`${styles.ScrollTop} ${visible && styles.Visible}`}
		>
			<img className={styles.ScrollTopIcon} src={arrowTop} />
		</div>
	)
}
