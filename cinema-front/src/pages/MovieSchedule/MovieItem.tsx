
import styled from 'styled-components'
import { MovieModel } from '../../types/MovieModelType'
import useAuthHook from '../../utils/auth/useAuth'
import CircleAge from '../../components/CircleAge'

interface MovieItemType {
   movie: MovieModel
}

const MovieItem = ({movie}:MovieItemType) => {
    const { api } = useAuthHook()
  return (
    <Wrapper>
        <MovieItemContainer>
        <MovieImage src={api + movie.cover.path}/>
        <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieBasicInfo><CircleAge>{movie.ageRestrictions}</CircleAge>{movie.genre} | {movie.screeningLength} minut</MovieBasicInfo>

      </MovieInfo>
      </MovieItemContainer>
    </Wrapper>
  )
}

export default MovieItem

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`

const MovieImage = styled.img`
  max-width: 150px;
  margin-right: 20px;
  border-radius: 10px;
`;

const MovieInfo = styled.div`
  flex: 1;
`;

const MovieItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const MovieTitle = styled.h3`
    text-transform: uppercase;
`

const MovieBasicInfo = styled.div`
    text-transform: capitalize;
    display: flex;
    flex-direction: row;

    align-items: center;
`