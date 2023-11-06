import { ReactNode } from 'react'
import styled from 'styled-components'

interface SubmitButtonType {
	className?: string
	children?: ReactNode
	type: 'button' | 'submit' | 'reset'
	onClick?: () => void
}

const SubmitButton = ({ className, children, type, onClick }: SubmitButtonType) => {
	return (
		<StyledButton className={className} type={type} onClick={onClick}>
			{children}
		</StyledButton>
	)
}

export default SubmitButton

const StyledButton = styled.button`
	width: 100%;
	border: none;
	border-radius: 4px;
	padding: 8px 0;

	box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
	transition: 0.5s;
	font-weight: 700;
	font-size: 15px;
	line-height: 26px;
	letter-spacing: 0.46px;
	font-family: 'Roboto';
	text-align: center;
	&:hover {
		cursor: pointer;
	}

	&.primary {
		background-color: ${({ theme }) => theme.colors.primary};
		color: white;
		&:hover {
			cursor: pointer;
			background-color: ${({ theme }) => theme.colors.secondary};
		}
	}

	&.success {
		background-color: ${({ theme }) => theme.colors.accept};
		color: white;
		&:hover {
			background-color: ${({ theme }) => theme.colors.success};
		}
	}

	svg {
		position: relative;
		top: 2px;
	}
`
