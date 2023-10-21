import { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
interface ReminderType {
	children?: ReactNode
	link: string
	onClick?: () => void
}

const Reminder = ({ link, children }: ReminderType) => {
	return (
		<Wrapper>
			<StyledLink to={link}>{children}</StyledLink>
		</Wrapper>
	)
}

export default Reminder

const Wrapper = styled.div``
const StyledLink = styled(Link)`
	color: ${({ theme }) => theme.colors.primary};
	font-size: 15px;
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
