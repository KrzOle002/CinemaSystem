import styled from 'styled-components'
import MovieInstance from './MovieInstance'
import SectionHeader from '../../../components/SectionHeader'
import { Grid } from '@mui/material'
import { MovieModel } from '../../../types/MovieModelType'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useAuthHook from '../../../utils/auth/useAuth'

const Actualshow = () => {
	const [movieList, setMovieList] = useState<MovieModel[] | null>()

	const { api } = useAuthHook()

	const fetchMovies = async () => {
		try {
			const response = await axios.get(api + '/api/movie/movies')

			setMovieList(response.data)
		} catch (error) {
			setMovieList(null)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	return (
		<Wrapper>
			<SectionHeader>Teraz gramy</SectionHeader>
			<Container>
				{movieList?.map(movie => (
					<MovieInstance key={movie._id} movie={movie} />
				))}
			</Container>
		</Wrapper>
	)
}

export default Actualshow

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 50%;

	margin: 0 auto;
	padding: 40px 0;
`
const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 20px;
`
