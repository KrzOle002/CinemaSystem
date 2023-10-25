import styled from 'styled-components'
import { Slideshow } from '../../utils/slider/Slideshow'
import Actualshow from './Components/Actualshow'

const Dashboards = () => {
	return (
		<Wrapper>
			<Slideshow />
			<Actualshow />
		</Wrapper>
	)
}

export default Dashboards

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
`
