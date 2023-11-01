import styled from 'styled-components'
import SectionHeader from '../../../components/SectionHeader'
import img from '../../../assets/rodzina.jpg'

const Discount = () => {
	const data = [img, img, img]
	return (
		<Wrapper>
			<SectionHeader>Promocje</SectionHeader>
			<Container>
				{data.map(img => {
					return (
						<PhotoContainer>
							<Photo src={img} />
						</PhotoContainer>
					)
				})}
			</Container>
		</Wrapper>
	)
}

export default Discount

const Wrapper = styled.div`
	width: 60%;
	margin: 0 auto;
`
const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

const PhotoContainer = styled.div`
	width: 30%;
`

const Photo = styled.img`
	width: 18vw;
	height: 100%;
`
