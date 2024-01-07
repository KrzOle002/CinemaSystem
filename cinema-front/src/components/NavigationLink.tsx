import { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
interface NavigationLinkType {
	children?: ReactNode
	link?: string
	onClick?: () => void
	size: string
}

const NavigationLink = ({ link, children, size, onClick }: NavigationLinkType) => {
	return (
		<Wrapper>
			{link ? (
				<StyledLink to={link} style={{ fontSize: size }}>
					{children}
				</StyledLink>
			) : (
				<StyledDiv onClick={onClick} style={{ fontSize: size }}>
					{children}
				</StyledDiv>
			)}
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
const StyledDiv = styled.div`
	color: ${({ theme }) => theme.colors.white};
	cursor: pointer;
	&:hover {
		text-decoration: underline;
		color: ${({ theme }) => theme.colors.secondary};
	}
`
