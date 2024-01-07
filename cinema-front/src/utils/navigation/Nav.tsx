import styled from 'styled-components'
import Header from '../header/Header'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { useLocation } from 'react-router-dom'
import logo from '../../assets/logo-icon.png'

const Nav = () => {
	const resolution = useScreenWidth()
	const location = useLocation()
	return (
		<Wrapper>
			{location.pathname != '/login' && location.pathname != '/register' ? (
				resolution > 600 ? (
					<Header />
				) : (
					<Top>
						<img src={logo} />
						<span>Cinema Fordon</span>
					</Top>
				)
			) : null}
		</Wrapper>
	)
}

export default Nav

export const Wrapper = styled.div`
	position: relative;
`

export const Top = styled.div`
	width: 100%;
	height: 40px;
	background-color: #d0153f;
	z-index: 100;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	column-gap: 10px;
	span {
		color: ${({ theme }) => theme.colors.white};
	}
	img {
		max-width: 32px;
		height: auto;
	}
`
