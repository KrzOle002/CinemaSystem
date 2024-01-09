import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import SubmitButton from '../../../components/SubmitButton'
import { Room } from '../../../types/ScreeningModelType'
import useAuthHook from '../../../utils/auth/useAuth'
import EmptyState from '../../../utils/empty/EmptyState'
import ScheduleItem from './ScheduleItem'
import { PostScreeningType, ScreeningData } from './SchedulePanel'

interface CinemaScheduleType {
	postScreening: PostScreeningType | null
	setPostScreening: (arg: PostScreeningType) => void
}

const CinemaSchedule = ({ postScreening, setPostScreening }: CinemaScheduleType) => {
	const [roomList, setRoomList] = useState<Room[]>([])
	const { api } = useAuthHook()
	const [newScreening, setNewScreening] = useState<ScreeningData[]>([])
	const createSchedule = (roomId: string) => {
		const screeningdata = {
			roomId,
			movieId: '',
			hour: '',
		}
		if (!postScreening) return

		const newScreeningData = [...postScreening.screeningData, screeningdata]
		setPostScreening({ ...postScreening, screeningData: newScreeningData })
	}

	const deleteSchedule = (index: number) => {
		if (!postScreening) return

		const newScreeningData = postScreening.screeningData.filter((_, i) => i !== index)

		setPostScreening({ ...postScreening, screeningData: newScreeningData })
	}

	const fetchData = async () => {
		try {
			const roomResponse = await axios.get(api + '/api/room/rooms')
			setRoomList(roomResponse.data)
		} catch (error) {
			setRoomList([])
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	if (roomList === undefined) return <EmptyState />
	console.log(postScreening)
	return (
		<Wrapper>
			{roomList.map(room => (
				<Container key={room._id}>
					<h3>Sala nr {room.roomNumber}</h3>
					{postScreening?.screeningData.map((screening, index) => {
						if (screening.roomId == room._id) {
							return (
								<ScheduleContainer key={index}>
									<ScheduleItem setPostScreening={setPostScreening} index={index} postScreening={postScreening} />
									<DeleteForeverIcon onClick={() => deleteSchedule(index)} sx={{ cursor: 'pointer', '&:hover': { color: 'gray' } }} />
								</ScheduleContainer>
							)
						}
					})}
					<SubmitButton type={'button'} className='primary' onClick={() => createSchedule(room._id)}>
						Dodaj film
					</SubmitButton>
				</Container>
			))}
		</Wrapper>
	)
}

export default CinemaSchedule

const Wrapper = styled.div`
	@media screen and (max-width: 800px) {
		flex-direction: column;
	}
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 200px;
	padding: 40px 0;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const ScheduleContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	padding: 0 0 20px 0;
`
