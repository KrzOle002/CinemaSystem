import styled from 'styled-components'
import Header from '../header/Header'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import Footer from '../footer/Footer'
import { useLocation } from 'react-router-dom'

const Nav = () => {
	const resolution = useScreenWidth()
	const location = useLocation()
	return (
		<Wrapper>
			{location.pathname != '/login' && location.pathname != '/register' ? (
				resolution > 600 ? (
					<Header />
				) : (
					<Footer />
				)
			) : null}
		</Wrapper>
	)
}

export default Nav

export const Wrapper = styled.div``
