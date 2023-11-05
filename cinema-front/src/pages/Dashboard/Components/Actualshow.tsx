import styled from 'styled-components'
import MovieInstance from './MovieInstance'
import SectionHeader from '../../../components/SectionHeader'
import { Grid } from '@mui/material'

const Actualshow = () => {
	const data = [1, 2, 3, 4, 5, 6, 7, 8]
	return (
		<Wrapper>
			<SectionHeader>Teraz gramy</SectionHeader>
			<Grid container lg={12} item spacing={4}>
				{data.map(age => (
					<Grid item lg={3} sm={4} xs={12} justifyContent={'flex-end'}>
						<MovieInstance movieTitle={'Openheimer'} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	)
}

export default Actualshow

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 60%;

	margin: 0 auto;
	padding: 40px 0;
`
