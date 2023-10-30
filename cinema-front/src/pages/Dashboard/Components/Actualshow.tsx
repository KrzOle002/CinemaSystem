import styled from 'styled-components'
import MovieInstance from './MovieInstance'

const Actualshow = () => {
	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	return (
		<Wrapper>
			<Header>Teraz gramy</Header>
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
const Header = styled.p`
	@media screen and (max-width: 640px) {
		font-size: 24px;
		text-align: center;
	}
	font-size: 36px;
	font-family: 'Saira Stencil One', sans-serif;
	text-transform: uppercase;
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
