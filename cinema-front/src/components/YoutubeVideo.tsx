import styled from 'styled-components'

interface YouTubeVideoType {
	link: string
}

export const YouTubeVideo = ({ link }: YouTubeVideoType) => {
	return (
		<Wrapper>
			<Video
				src={link}
				title='YouTube video player'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Video = styled.iframe`
	@media screen and (max-width: 640px) {
		width: 100%;
	}
	width: 15vw;
	height: 100%;
`
