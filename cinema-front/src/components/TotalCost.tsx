import React from 'react'
import styled from 'styled-components'
import SubmitButton from './SubmitButton'

interface TotalCostType {
	selected: string[]
	setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

const TotalCost = ({ selected, setSelected }: TotalCostType) => {
	const ticketCost = selected.length * 20
	const ticketSelected = selected.length
	const ticketService = ticketSelected ? 2 : 0
	const resetSeats = () => setSelected([])
	return (
		<Wrapper>
			<Container>
				<Table>
					<thead>
						<tr>
							<TableHeader>Cena biletu</TableHeader>
							<TableHeader>Ilość</TableHeader>
							<TableHeader>Opłata serwisowa</TableHeader>
							<TableHeader>Całkowity koszt</TableHeader>
						</tr>
					</thead>
					<tbody>
						<tr>
							<TableCell>{ticketCost} PLN</TableCell>
							<TableCell>{ticketSelected}</TableCell>
							<TableCell>{ticketService} PLN</TableCell>
							<TableCell>{ticketCost + ticketService} PLN</TableCell>
						</tr>
					</tbody>
				</Table>
				<SubmitButton onClick={resetSeats} type={'button'} className='primary'>
					Cofnij
				</SubmitButton>
			</Container>
		</Wrapper>
	)
}

export default TotalCost
const Wrapper = styled.div`
	padding-bottom: 20px;
	width: 100%;
	font-size: 15px;
	line-height: 15px;
`
const Container = styled.div`
	@media screen and (max-width: 800px) {
		flex-direction: column;
	}
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	font-size: 15px;
	line-height: 15px;
`
const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`

const TableHeader = styled.th`
	border: 1px solid #ddd;
	padding: 8px;
	text-align: center;

	&:not(:first-child) {
		border-left: 0px;
	}
	&:not(:last-child) {
		border-right: 0px; /* Usunięcie kreski pionowej dla ostatniej komórki w nagłówku */
	}
`

const TableCell = styled.td`
	border: 1px solid #ddd;
	padding: 8px;
	text-align: center;
	&:not(:first-child) {
		border-left: 0px;
	}
	&:not(:last-child) {
		border-right: 0px; /* Usunięcie kreski pionowej dla ostatniej komórki w wierszu */
	}
`
