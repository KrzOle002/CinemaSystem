import { PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from 'react'
import { toast } from 'react-toastify'
interface ProductType {
	description: string
	price: number
}

const PaypalCheckoutButton = (props: { product: ProductType }) => {
	const { product } = props

	const [paidFor, setPaidFor] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const handleApprove = (orderId: string) => {
		setPaidFor(true)
	}

	if (paidFor) {
		toast.success('Płatność zaakceptowana')
	}

	if (error) {
		toast.error('Błąd Płatności')
	}
	return (
		<PayPalButtons
			createOrder={(data, actions) => {
				return actions.order.create({
					purchase_units: [
						{
							description: product.description,
							amount: {
								value: product.price.toFixed(2),
								currency_code: 'PLN',
							},
						},
					],
				})
			}}
			onApprove={async (data, actions) => {
				const order = await actions.order?.capture()
				console.log(order)

				handleApprove(data.orderID)
			}}
			onError={err => {
				setError(err as any)
				console.error(err)
			}}
			onCancel={() => {
				toast.warning('Anulowano płatność')
			}}
			onClick={(data, actions) => {
				const hasAlreadyBoughtCourse = false

				if (hasAlreadyBoughtCourse) {
					toast.warning('Właśnie zostało za to zapłacone')

					return actions.reject()
				} else {
					return actions.resolve()
				}
			}}
		/>
	)
}

export default PaypalCheckoutButton
