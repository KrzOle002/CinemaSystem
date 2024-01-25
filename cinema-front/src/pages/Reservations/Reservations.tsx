import styled from 'styled-components'
import PageFooter from '../PageFooter'
import useAuthHook from '../../utils/auth/useAuth'
import { useEffect, useState } from 'react'
import ReservationsItem from './Components/ReservationsItem'
import { ReservationData } from '../../types/ReservationModelType'
import SectionHeader from '../../components/SectionHeader'
import ReservationsFilter from './Components/ReservationsFilter'


const Reservations = () => {
	const { api, axiosAuth, userName } = useAuthHook()

	const [reservations, setReservations] = useState<ReservationData[] | null>(null)
	const [filteredReservations, setFilteredReservations] = useState<ReservationData[] | null>(null)
	const fetchReservations = async () => {
		try {
			const response = await axiosAuth.get(api + `/api/reservation/reservations/userAll?email=${userName}`)

			setReservations(response.data)
			setFilteredReservations(response.data)
		} catch (error) {
			setReservations([])
			setFilteredReservations([])
		}
	}

	useEffect(() => {
		fetchReservations()
	}, [])

	return (
		<Wrapper>
			<Container>
				<SectionHeader>Rezerwacje</SectionHeader>
				<ReservationsFilter setFilteredReservations={setFilteredReservations} reservations={reservations} />
				{filteredReservations && filteredReservations?.length>0? filteredReservations?.map((reservation, index) => (
					<ReservationsItem key={index} reservation={reservation} />
				)):<h3 style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Brak rezerwacji</h3>}
			</Container>
			<PageFooter />
		</Wrapper>
	)
}

export default Reservations

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};

`

const Container = styled.div`
	@media screen and (max-width: 800px) {
		width: 90%;
	}
	height: 100vh;
	width: 50%;
	margin: 40px auto;
`
