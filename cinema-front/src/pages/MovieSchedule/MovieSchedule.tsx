import styled from 'styled-components'
import InputLabel from '../../components/InputLabel'
import PageDescription from '../../components/PageDescription'
import SubmitButton from '../../components/SubmitButton'
import { useDialogHandler } from '../../utils/dialog/useDialogHandler'
import { Slideshow } from '../../utils/slider/Slideshow'
import useAuthHook from './../../utils/auth/useAuth'
import AdditionMovieDialog from './AdditionMovieDialog'

const MovieSchedule = () => {
	const { isAdmin } = useAuthHook()
	const { isOpen, open, close } = useDialogHandler()
	return (
		<Wrapper>
			<Slideshow />
			<Container>
				<PageDescription>Repertuar Cinema Fordon</PageDescription>
				<MovieControl>
					<InputLabel placeholder={'Filtr'} />

					{isAdmin ? (
						<SubmitButton type={'button'} onClick={() => open()} className={'primary'}>
							Dodaj film
						</SubmitButton>
					) : null}
				</MovieControl>
				<MoviesList>
					<MovieItem>ddd</MovieItem>
				</MoviesList>
			</Container>

			<AdditionMovieDialog isOpen={isOpen} close={close} />
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
const MovieControl = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
`
const MoviesList = styled.div`
	width: 100%;
`
const MovieItem = styled.div`
	width: 100%;
`
