import styled from 'styled-components'
import SectionHeader from '../../../components/SectionHeader'
import img from '../../../assets/rodzina.jpg'

const Discount = () => {
	const data = [img, img, img]
	return (
		<Wrapper>
			<SectionHeader>Promocje</SectionHeader>
			<Container>
				{data.map((img, index) => {
					return (
						<PhotoContainer key={index}>
							<Photo src={img} />
							<DiscountDescription>Piątki z rodziną</DiscountDescription>
						</PhotoContainer>
					)
				})}
			</Container>
		</Wrapper>
	)
}

export default Discount

const Wrapper = styled.div`
	padding: 40px 0;
	width: 60%;
	margin: 0 auto;
`
const Container = styled.div`
	@media screen and (max-width: 640px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		row-gap: 40px;
	}
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const PhotoContainer = styled.div`
	@media screen and (max-width: 640px) {
		width: 100%;
	}
	width: 30%;
	padding: 7px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.primary};
	text-align: center;
	box-shadow: 5px 5px 2px 1px rgba(145, 68, 68, 0.2);
`

const Photo = styled.img`
	@media screen and (max-width: 640px) {
		width: 100%;
	}
	width: 18vw;
	height: auto;
`
const DiscountDescription = styled.span`
	@media screen and (max-width: 640px) {
		font-size: 4vw;
	}
	font-size: 1vw;
`
