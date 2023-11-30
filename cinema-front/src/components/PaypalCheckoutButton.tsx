import { PayPalButtons, FUNDING } from '@paypal/react-paypal-js'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import useAuthHook from '../utils/auth/useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useReservationContext } from '../context/ReservationContext'
interface ProductType {
	description: string
	price: number
}

interface PaypalType {
	product: ProductType
}
const PaypalCheckoutButton = ({ product }: PaypalType) => {
	const { api, isAuthenticated, userData } = useAuthHook()
	const { reservation } = useReservationContext()
	const [paidFor, setPaidFor] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()
	const makeReservation = async () => {
		if (reservation) {
			const data = {
				active: true,
				screeningId: reservation?.screeningId,
				cost: reservation?.cost,
				screeningDate: reservation?.screeningDate,
				discountId: reservation?.discount,
				email: isAuthenticated() ? userData?.email : reservation?.customer?.email,
				seats: reservation?.seats,
			}

			await axios
				.post(api + '/api/reservation', data)
				.then(() => {
					toast.success('Zarezerwowano')
					axios.post(api + '/api/mail/reservation-mail', { reservation, userData })
				})
				.catch(() => toast.error('Nie udało się zarezerwować'))
		}
	}
	console.log(userData)
	const handleApprove = (orderId: string) => {
		setPaidFor(true)
		toast.success('Płatność zaakceptowana')
		makeReservation()
		navigate('/')
	}
	if (error) {
		toast.error('Błąd Płatności')
	}
	return (
		<PayPalButtons
			style={{
				layout: 'vertical',
				color: 'gold',
				shape: 'rect',
				label: 'paypal',
			}}
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
			}}
			onCancel={() => {
				toast.warning('Anulowano płatność')
			}}
			onClick={(data, actions) => {
				console.log(data)
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
