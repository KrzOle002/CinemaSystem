import styled from 'styled-components'
import SectionHeader from '../../../components/SectionHeader'
import { YouTubeVideo } from '../../../components/YoutubeVideo'

const Announcements = () => {
	return (
		<Wrapper>
			<SectionHeader>Zapowiedzi</SectionHeader>
			<Container>
				<YouTubeVideo link={'https://www.youtube.com/embed/bWdZbAgmVFY?si=WCx1i0kSrLUPNFiT'} />
				<YouTubeVideo link={'https://www.youtube.com/embed/bWdZbAgmVFY?si=WCx1i0kSrLUPNFiT'} />
				<YouTubeVideo link={'https://www.youtube.com/embed/bWdZbAgmVFY?si=WCx1i0kSrLUPNFiT'} />
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
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
