import type { ICartPizza } from '../../../models'

export interface CartState {
	fullPrice: number
	count: number
	pizzas: ICartPizza[]
}
