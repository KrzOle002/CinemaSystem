import styled from 'styled-components'
import SectionHeader from '../../../components/SectionHeader'
import { YouTubeVideo } from '../../../components/YoutubeVideo'

const Announcements = () => {
	return (
		<Wrapper>
			<SectionHeader>Zapowiedzi</SectionHeader>
			<Container>
				<YouTubeVideo link={'https://www.youtube.com/embed/jM0cs0GLR4o?si=8lxy4HjiSQlqQ88g'} />
				<YouTubeVideo link={'https://www.youtube.com/embed/Z8tCizuEXVc?si=uY6oEsuF-V7OumPC'} />
				<YouTubeVideo link={'https://www.youtube.com/embed/OG_82yCmqHw?si=wiBzvLuCaiC3wiRm'} />
			</Container>
		</Wrapper>
	)
}

export default Announcements

const Wrapper = styled.div`
	padding: 40px 0;
	width: 50%;
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
