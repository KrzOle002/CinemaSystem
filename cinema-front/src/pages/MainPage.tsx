import styled from 'styled-components'
import { MainRoutes } from '../routes/MainRoutes'

const MainPage = () => {
	return (
		<Wrapper>
			<MainRoutes />
		</Wrapper>
	)
}

export default MainPage

export const Wrapper = styled.div`
	width: 100%;
`
