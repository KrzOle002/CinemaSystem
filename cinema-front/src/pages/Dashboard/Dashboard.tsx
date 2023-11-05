import styled from 'styled-components'
import { Slideshow } from '../../utils/slider/Slideshow'
import Actualshow from './Components/Actualshow'
import Announcements from './Components/Announcements'
import Discount from './Components/Discount'
import PageFooter from '../PageFooter'

const Dashboards = () => {
	return (
		<Wrapper>
			<Slideshow />
			<Actualshow />
			<Announcements />
			<Discount />
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
