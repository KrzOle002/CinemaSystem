import styled from 'styled-components'
import MovieInstance from './MovieInstance'
import SectionHeader from '../../../components/SectionHeader'

const Actualshow = () => {
	const data = [1, 2, 3, 4, 5, 6, 7, 8]
	return (
		<Wrapper>
			<SectionHeader>Teraz gramy</SectionHeader>
			<Container>
				{data.map(age => (
					<MovieInstance movieTitle={'Openheimer'} />
				))}
			</Container>
		</Wrapper>
	)
}

export default Actualshow

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 60%;

	margin: 0 auto;
	padding: 40px 0;
`

const Container = styled.div`
	@media screen and (max-width: 640px) {
		justify-content: center;
	}
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	gap: 40px;
`
