import styled from 'styled-components'
import SubmitButton from '../../../components/SubmitButton'
import useAuthHook from '../../../utils/auth/useAuth'
import { toast } from 'react-toastify'
import { ChangeEvent, useEffect, useState } from 'react'
import { MovieModel } from '../../../types/MovieModelType'
import InputLabel from '../../../components/InputLabel'
import axios from 'axios'
import EmptyState from '../../../utils/empty/EmptyState'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Divider } from '@mui/material'
import AdditionMovieDialog from '../components/AdditionMovieDialog'
import { useDialogHandler } from '../../../utils/dialog/useDialogHandler'
import EditIcon from '@mui/icons-material/Edit'
import { useUserAuthContext } from '../../../context/UserAuthContext'
import EditMovieDialog from '../components/EditMovieDialog'

const MoviePanel = () => {
	const { axiosAuth, api } = useAuthHook()
	const { isAdmin } = useUserAuthContext()
	const [movieList, setMovieList] = useState<MovieModel[] | null>(null)

	const { isOpen, open, close } = useDialogHandler()
	const { isOpen: isOpenEdit, open: openEdit, close: closeEdit } = useDialogHandler()
	const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)

	const editMovie = async (id: number) => {
		if (isAdmin) {
			setSelectedMovieId(id)
			openEdit()
		}
	}

	const deleteMovie = async (id: number) => {
		if (isAdmin) {
			try {
				await axiosAuth.delete(api + `/api/movie/movies/${id}`)
				if (movieList) setMovieList(movieList.filter(movieItem => movieItem._id != id))
				toast.success('Usunięto film')
			} catch (err) {
				toast.error('Nie można usunąć filmu')
			}
		}
	}

	const handleFilterMovies = (e: ChangeEvent<HTMLInputElement>) => {
		fetchMovies(e.target.value)
	}
	const fetchMovies = async (title?: string) => {
		try {
			const getter = title ? `/api/movie/movies?title=${title}` : `/api/movie/movies`
			const response = await axios.get(api + getter)

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
			<SubmitButton
				fullWidth
				type={'button'}
				onClick={() => {
					setSelectedMovieId(null)
					open()
				}}
				className={'primary'}>
				Dodaj film
			</SubmitButton>
			<Divider sx={{ padding: '10px 0' }} />
			<InputLabel placeholder={'Filtr'} onChange={handleFilterMovies} />
			<Divider sx={{ padding: '10px 0' }} />
			<MovieList>
				{movieList ? (
					movieList.map(movie => {
						return (
							<MovieItem key={movie._id}>
								<MovieDescription>
									<MovieText>{movie.title}</MovieText>
									<MovieText>{movie.director}</MovieText>
									<MovieText>{movie.genre}</MovieText>
									<MovieText>{movie.screeningLength}</MovieText>
									<MovieText>{movie.productionYear}</MovieText>
									<MovieText>{movie.productionCountry}</MovieText>
								</MovieDescription>
								<MovieControlls>
									<SubmitButton fullWidth className='warn' type={'button'} onClick={() => editMovie(movie._id)}>
										<EditIcon />
										Edytuj
									</SubmitButton>
									<SubmitButton fullWidth className='important' type={'button'} onClick={() => deleteMovie(movie._id)}>
										<DeleteForeverIcon />
										Usuń
									</SubmitButton>
								</MovieControlls>
							</MovieItem>
						)
					})
				) : (
					<EmptyState />
				)}
			</MovieList>
			<AdditionMovieDialog isOpen={isOpen} close={close} />
			<EditMovieDialog isOpen={isOpenEdit} close={closeEdit} movieId={selectedMovieId} />
		</Wrapper>
	)
}

export default MoviePanel

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`

const MovieList = styled.div`
	padding: 20px 0;
	height: 400px;
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	gap: 40px;
`

const MovieItem = styled.div`
	background-color: ${({ theme }) => theme.colors.primary};
	display: flex;
	flex-direction: row;
	padding: 10px 20px;
	border-radius: 15px;
	margin: 0 20px;
	justify-content: space-between;
`
const MovieDescription = styled.div`
	display: flex;
	flex-direction: column;
`
const MovieText = styled.p`
	font-size: 16px;
	margin: 0;
	padding: 0;
`
const MovieControlls = styled.div`
	height: min-content;
	display: flex;
	flex-direction: column;
	gap: 20px;
`
