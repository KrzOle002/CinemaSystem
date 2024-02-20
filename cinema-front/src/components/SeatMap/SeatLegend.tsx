import styled from 'styled-components'

const SeatLegend = () => {
	return (
		<SeatWrapper>
			<SeatLegendInstance>
				<SeatLegendColor style={{ backgroundColor: '#D0153F' }} />
				<SeatLegendTitle>Wolne</SeatLegendTitle>
			</SeatLegendInstance>
			<SeatLegendInstance>
				<SeatLegendColor style={{ backgroundColor: 'gray' }} />
				<SeatLegendTitle>Zajęte</SeatLegendTitle>
			</SeatLegendInstance>
			<SeatLegendInstance>
				<SeatLegendColor style={{ backgroundColor: '#584A86' }} />
				<SeatLegendTitle>Wybrane przez Ciebie</SeatLegendTitle>
			</SeatLegendInstance>
		</SeatWrapper>
	)
}

export default SeatLegend

const SeatLegendTitle = styled.span`
	font-size: 15px;
	line-height: 15px;
`
const SeatLegendColor = styled.div`
	width: 15px;
	height: 15px;
`
const SeatLegendInstance = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;
`
const SeatWrapper = styled.div`
	padding: 20px 0;
	display: flex;
	flex-direction: row;
	gap: 20px;
`
