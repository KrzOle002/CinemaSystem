import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Room } from '../../../types/ScreeningModelType'
import useAuthHook from '../../../utils/auth/useAuth'
import EmptyState from '../../../utils/empty/EmptyState'
import ScheduleList from './ScheduleList'
import { ScreeningData } from './SchedulePanel'
import SubmitButton from '../../../components/SubmitButton'

interface CinemaScheduleType {
	onFinalize: (arg: Record<string, ScreeningData[]>) => void
}

const CinemaSchedule = ({ onFinalize }: CinemaScheduleType) => {
	const [roomList, setRoomList] = useState<Room[]>([])
	const [roomScreenings, setRoomScreenings] = useState<Record<string, ScreeningData[]>>({})
	const { api } = useAuthHook()
	const handleFinalize = () => {
		onFinalize(roomScreenings)
	}
	const fetchData = async () => {
		try {
			const roomResponse = await axios.get(`${api}/api/room/rooms`)
			setRoomList(roomResponse.data)
		} catch (error) {
			setRoomList([])
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleSetRoomScreenings = (roomId: string, screenings: ScreeningData[]) => {
		setRoomScreenings(prev => ({ ...prev, [roomId]: screenings }))
	}

	if (!roomList.length) return <EmptyState />

	return (
		<Wrapper>
			<ScheduleContainer>
				{roomList.map(room => (
					<Container key={room._id}>
						<h3>Sala nr {room.roomNumber}</h3>
						<ScheduleList
							roomId={room._id}
							screenings={roomScreenings[room._id] || []}
							setScreenings={screenings => handleSetRoomScreenings(room._id, screenings)}
						/>
					</Container>
				))}
			</ScheduleContainer>
			<SubmitButton fullWidth type={'button'} className='primary' onClick={handleFinalize}>
				Zatwierdź repertuar
			</SubmitButton>
		</Wrapper>
	)
}

export default CinemaSchedule

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 40px 0;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const ScheduleContainer = styled.div`
	@media screen and (max-width: 800px) {
		flex-direction: column;
	}
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	padding: 0 0 20px 0;
	gap: 200px;
`
