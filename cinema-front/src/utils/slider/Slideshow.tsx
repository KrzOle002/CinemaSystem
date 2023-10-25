import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import img from '../../assets/pilecki.jpg'

const divStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundSize: '100% auto',
	backgroundRepeat: 'no-repeat',
	height: ' 0',
	paddingTop: '22%',
}
const slideImages = [
	{
		url: img,
		caption: 'Slide 1',
	},
	{
		url: img,
		caption: 'Slide 1',
	},
	{
		url: img,
		caption: 'Slide 1',
	},
	{
		url: img,
		caption: 'Slide 1',
	},
]

export const Slideshow = () => {
	return (
		<div className='slide-container' style={{ width: '100%' }}>
			<Slide>
				{slideImages.map((slideImage, index) => (
					<div key={index}>
						<div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }} />
					</div>
				))}
			</Slide>
		</div>
	)
}
