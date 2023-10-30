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
					<MovieInstance movieTitle={'OpenHeimer'} />
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
`

const Container = styled.div`
	@media screen and (max-width: 640px) {
		justify-content: center;
	}
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 40px;
`
