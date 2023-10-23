import styled from 'styled-components'
import DesktopNavbar from './DesktopNavbar'

const Navbar = () => {
	return (
		<Wrapper>
			<DesktopNavbar />
		</Wrapper>
	)
}

export default Navbar

export const Wrapper = styled.div`
	position: fixed;
	z-index: 1;
	width: 100%;
`
