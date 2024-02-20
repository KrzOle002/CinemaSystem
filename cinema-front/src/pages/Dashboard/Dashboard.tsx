import styled from 'styled-components'

import Actualshow from './Components/Actualshow'
import Announcements from './Components/Announcements'

import PageFooter from '../PageFooter'

const Dashboards = () => {
	return (
		<Wrapper>
			<Container>
				<Actualshow />
				<Announcements />
			</Container>
			<PageFooter />
		</Wrapper>
	)
}

export default Dashboards

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	color: white;
`
const Container = styled.div`
	min-height: 100vh;
`
