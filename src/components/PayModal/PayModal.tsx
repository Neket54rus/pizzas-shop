import { FC, useState } from 'react'

import successImage from '../../assets/img/success-icon.svg'
import styles from './PayModal.module.scss'

interface PayModalProps {
	active: boolean
	setActive: () => void
}

export const PayModal: FC<PayModalProps> = ({ active, setActive }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const closeModal = () => {
		setActive()
		setSuccess(false)
	}

	const handlerSuccessButton = () => {
		if ((name && phone).length < 1) {
			setError(true)
		} else {
			setError(false)
			setSuccess(true)
			setName('')
			setPhone('')
		}
	}

	const activeStyle = active ? styles.Active : ''

	const successContent = (
		<>
			<img
				className={styles.PayModalContentSuccessImage}
				src={successImage}
			/>
			<p className={styles.PayModalContentP}>
				Спасибо за заказ! Наш оператор свяжется с вами в течение 10
				минут.
			</p>
		</>
	)

	return (
		<div
			onClick={closeModal}
			className={`${styles.PayModal} ${activeStyle}`}
		>
			<div
				onClick={(event) => event.stopPropagation()}
				className={styles.PayModalContent}
			>
				<div
					onClick={closeModal}
					className={styles.PayModalContentClose}
				>
					✖
				</div>

				{success ? (
					successContent
				) : (
					<>
						<div className={styles.PayModalContentName}>
							<p className={styles.PayModalContentNameTitle}>
								Имя:
							</p>
							{error && (
								<p className={styles.PayModalContentError}>
									Введите имя!
								</p>
							)}
							<input
								value={name}
								onChange={(event) =>
									setName(event.target.value)
								}
								className={styles.PayModalContentNameInput}
								placeholder="Введите ваше имя"
							/>
						</div>

						<div className={styles.PayModalContentPhone}>
							<p className={styles.PayModalContentPhoneTitle}>
								Телефон:
							</p>
							{error && (
								<p className={styles.PayModalContentError}>
									Введите номер!
								</p>
							)}
							<input
								value={phone}
								onChange={(event) =>
									setPhone(event.target.value)
								}
								className={styles.PayModalContentPhoneInput}
								placeholder="Введите ваш номер телефона"
								type="tel"
							/>
						</div>

						<button
							onClick={handlerSuccessButton}
							className={`button ${styles.PayModalContentButton}`}
							// disabled={(name && phone).length < 1}
						>
							Далее
						</button>
					</>
				)}
			</div>
		</div>
	)
}
