import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

const EmptyState = () => {
	return (
		<Wrapper>
			<CircularProgress />
		</Wrapper>
	)
}

export default EmptyState

const Wrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 200px;
`
