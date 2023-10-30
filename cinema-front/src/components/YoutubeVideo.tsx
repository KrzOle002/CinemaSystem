interface YouTubeVideoType {
	link: string
}

export const YouTubeVideo = ({ link }: YouTubeVideoType) => {
	return (
		<div>
			<iframe
				width='312'
				height='200'
				src={link}
				title='YouTube video player'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
			/>
		</div>
	)
}
