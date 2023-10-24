import { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
interface NavigationLinkType {
	children?: ReactNode
	link: string
	onClick?: () => void
	size: string
}

const NavigationLink = ({ link, children, size }: NavigationLinkType) => {
	return (
		<Wrapper>
			<StyledLink to={link} style={{ fontSize: size }}>
				{children}
			</StyledLink>
		</Wrapper>
	)
}

export default NavigationLink

const Wrapper = styled.div``
const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.colors.primary};
	&:link {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.white};
	}
	&:visited {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.white};
	}
	&:active {
		text-decoration: none;
		color: ${({ theme }) => theme.colors.secondary};
	}
	&:hover {
		text-decoration: underline;
		color: ${({ theme }) => theme.colors.secondary};
	}
`
