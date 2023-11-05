import React from 'react'
import styled from 'styled-components'
import cover from '../../../assets/oppenheimer-plakat-online-cut_9593bae56e 1.jpg'

interface MovieInstanceType {
	movieTitle: string
}

const MovieInstance = ({ movieTitle }: MovieInstanceType) => {
	return (
		<Wrapper>
			<MovieImg src={cover} />
			<MovieTitle>{movieTitle}</MovieTitle>
		</Wrapper>
	)
}

export default MovieInstance

const MovieImg = styled.img`
	transition: filter 0.3s ease;
	width: 100%;
	margin: 0 auto;
	height: 50%;
`

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	position: relative;
	width: 100%;

	&:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.primary};
		${MovieImg} {
			box-shadow: 0px 8px 30px 3px rgba(0, 0, 0, 0.7);
		}
	}
`

const MovieTitle = styled.span`
	@media screen and (max-width: 600px) {
		padding-top: 5px;
		font-size: 5vw;
	}
	text-align: center;
	font-size: 1.2vw;
	font-family: 'Saira', sans-serif;
	text-transform: capitalize;

	z-index: 2;
`
