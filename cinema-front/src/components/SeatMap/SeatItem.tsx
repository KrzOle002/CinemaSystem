import styled from 'styled-components'
import { SeatModel } from '../../types/ScreeningModelType'
import { toast } from 'react-toastify'

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
		if (isSelected()) return '#584A86'
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
		else {
			toast.warning('Możesz zarezerwować maksymalnie 10 miejsc. Skontaktuj się z obsługą pod numerem 123-456-456, aby zarezerwować więcej miejsc.', {
				position: 'top-center',
				autoClose: false,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			setSelected([seat.seatId])
		}
	}

	return (
		<Wrapper style={{ backgroundColor: seatColor() }} onClick={handleClick}>
			<Container>{seat.number}</Container>
		</Wrapper>
	)
}

export default SeatItem

const Wrapper = styled.div`
	@media screen and (max-width: 800px) {
		width: 1.2em;
		height: 1.2em;
		min-height: 0;
		min-width: 0;
	}
	user-select: none;
	width: 30px;
	min-width: 30px;
	height: 30px;
	min-height: 30px;
	background-color: ${({ theme }) => theme.colors.primary};

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
	@media screen and (max-width: 800px) {
		font-size: 10px;
	}
	font-weight: bold;
`
