import styled from 'styled-components'
import MoviePanel from './MoviePanel/MoviePanel'
import SchedulePanel from './SchedulePanel/SchedulePanel'
const AdminPanel = () => {
	return (
		<Wrapper>
			<Container>
				<MoviePanel />
				<SchedulePanel />
			</Container>
		</Wrapper>
	)
}

export default AdminPanel

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100%;
`
const Container = styled.div`
	@media screen and (max-width: 640px) {
		width: 80%;
	}
	height: 100%;
	display: flex;
	flex-direction: row;
	gap: 20px;
	align-items: center;
	justify-content: center;
	width: 80%;
	margin: 0 auto;
`
