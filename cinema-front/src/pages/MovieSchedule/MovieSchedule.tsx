import React from 'react'
import styled from 'styled-components'
import { Slideshow } from '../../utils/slider/Slideshow'
import PageDescription from '../../components/PageDescription'

const MovieSchedule = () => {
	return (
		<Wrapper>
			<Slideshow />
			<Container>
				<PageDescription>Repertuar Cinema Fordon</PageDescription>
				<MoviesList>
					<MovieItem></MovieItem>
				</MoviesList>
			</Container>
		</Wrapper>
	)
}

export default MovieSchedule

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`
const Container = styled.div`
	width: 50%;
	margin: 0 auto;
`
const MoviesList = styled.div`
	width: 100%;
`
const MovieItem = styled.div`
	width: 100%;
`
