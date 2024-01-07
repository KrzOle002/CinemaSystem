import { CurrentSeat } from '../types/ScreeningModelType'
import styled from 'styled-components'

interface PaymentItemType {
	seat: CurrentSeat
}

const PaymentItem = ({ seat }: PaymentItemType) => {
	const cost = 20
	return (
		<Wrapper>
			<SeatInfo>
				<RowInfo>Rząd {seat.row} ,</RowInfo>
				<NumberInfo>Miejsce {seat.number}</NumberInfo>
			</SeatInfo>
			<CostInfo>{cost} PLN</CostInfo>
		</Wrapper>
	)
}

export default PaymentItem

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
const SeatInfo = styled.div`
	display: flex;
	flex-direction: row;
`
const RowInfo = styled.span`
	font-weight: 300;
`
const NumberInfo = styled.span`
	font-weight: 500;
`
const CostInfo = styled.span`
	font-weight: 500;
`
