import styled from 'styled-components'
import SectionHeader from '../../../components/SectionHeader'
import { YouTubeVideo } from '../../../components/YoutubeVideo'

const Announcements = () => {
	return (
		<Wrapper>
			<SectionHeader>Zapowiedzi</SectionHeader>
			<Container>
				<YouTubeVideo link={'https://www.youtube.com/embed/3X9u2bNG2aY?si=xmbbUE3m4z8MbFuk'} />
				<YouTubeVideo link={'https://www.youtube.com/embed/3X9u2bNG2aY?si=xmbbUE3m4z8MbFuk'} />
				<YouTubeVideo link={'https://www.youtube.com/embed/3X9u2bNG2aY?si=xmbbUE3m4z8MbFuk'} />
			</Container>
		</Wrapper>
	)
}

export default Announcements

const Wrapper = styled.div`
	width: 60%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`
const Container = styled.div`
	@media screen and (max-width: 640px) {
		flex-direction: column;
		row-gap: 20px;
		justify-content: center;
		align-items: center;
	}
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
