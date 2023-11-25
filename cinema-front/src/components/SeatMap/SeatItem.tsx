import styled from 'styled-components'
import { SeatModel } from '../../types/ScreeningModelType'

interface SeatItemType {
	seat: SeatModel
	selected: string[]
	setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

const SeatItem = ({ seat, selected, setSelected }: SeatItemType) => {
	const isSelected = () => {
		return selected.some(select => select == seat.seatId)
	}

	const seatColor = () => {
		if (!seat.empty) return 'gray'
		if (isSelected()) return 'yellow'
		return ''
	}

	const handleClick = () => {
		if (selected.length < 10)
			if (!isSelected() && seat.empty)
				setSelected((prev: string[]) => {
					return [...prev, seat.seatId]
				})
			else
				setSelected((prev: string[]) => {
					return prev.filter(seatId => seatId !== seat.seatId)
				})
		else setSelected([seat.seatId])
	}

	return (
		<Wrapper style={{ backgroundColor: seatColor() }} onClick={handleClick}>
			<Container>{seat.number}</Container>
		</Wrapper>
	)
}

export default SeatItem

const Wrapper = styled.div`
	user-select: none;
	width: 30px;
	min-width: 30px;
	height: 30px;
	min-height: 30px;
	background-color: #109110;

	color: ${({ theme }) => theme.colors.white};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.colors.whiterMid};
	}
`
const Container = styled.div`
	font-weight: bold;
`
