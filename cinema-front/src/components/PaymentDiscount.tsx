import React, { ChangeEvent } from 'react'
import InputLabel from './InputLabel'
import styled from 'styled-components'
import { Reservation, useReservationContext } from '../context/ReservationContext'

interface PaymentDiscountType {
	discount: number | undefined
	setDiscount: React.Dispatch<React.SetStateAction<number | undefined>>
}

const PaymentDiscount = ({ discount, setDiscount }: PaymentDiscountType) => {
	const { reservation, setReservation } = useReservationContext()

	const handleDiscount = (e: ChangeEvent<HTMLInputElement>) => {
		const discountWord = e.target.value
		if (discountWord == 'ABC') {
			setDiscount(50)

			setReservation({
				...reservation,
				discount: 50,
			})
		} else {
			setDiscount(undefined)
			setReservation({
				...reservation,
				discount: null,
			})
		}
	}

	return (
		<Wrapper>
			<DiscountPlace>
				<span>Podaj kod promocjii</span>
				<InputLabel onChange={handleDiscount} />
			</DiscountPlace>
			{discount ? (
				<DiscountPlace>
					<span>Zniżka</span>
					{discount} PLN
				</DiscountPlace>
			) : null}
		</Wrapper>
	)
}

export default PaymentDiscount

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 20px;
`

const DiscountPlace = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`
