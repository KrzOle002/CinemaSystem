import React from 'react'
import styled from 'styled-components'
import cover from '../../../assets/oppenheimer-plakat-online-cut_9593bae56e 1.jpg'

interface MovieInstanceType {
	movieTitle: string
}

const MovieInstance = ({ movieTitle }: MovieInstanceType) => {
	return (
		<Wrapper>
			<Container>
				<MovieImg src={cover} />
				<Overlay />
			</Container>

			<MovieTitle>{movieTitle}</MovieTitle>
		</Wrapper>
	)
}

export default MovieInstance

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5); /* Kolor tła z przyciemnieniem */
	opacity: 0;
	transition: opacity 0.3s ease;
`
const Container = styled.div`
	position: relative;
	-webkit-box-shadow: 0px 8px 30px 3px rgba(0, 0, 0, 1);
	-moz-box-shadow: 0px 8px 30px 3px rgba(0, 0, 0, 1);
	box-shadow: 0px 8px 30px 3px rgba(0, 0, 0, 0.7);
`
const Wrapper = styled.div`
	@media screen and (max-width: 640px) {
		min-width: 200px;
	}
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	position: relative;
	width: 22%;

	&:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.primary};

		${Container} > ${Overlay} {
			opacity: 1;
		}
	}
`
const MovieImg = styled.img`
	transition: filter 0.3s ease;
	max-width: 100%;
	margin: 0 auto;
	height: auto;
`

const MovieTitle = styled.span`
	@media screen and (max-width: 640px) {
		padding-top: 5px;
		font-size: 5vw;
	}
	text-align: center;
	font-size: 1.2vw;
	font-family: 'Saira', sans-serif;
	text-transform: capitalize;

	z-index: 2;
`
