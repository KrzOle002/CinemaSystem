import { ReactNode } from 'react'
import styled from 'styled-components'

interface SubmitButtonType {
	className?: string
	children?: ReactNode
	type: 'button' | 'submit' | 'reset'
	onClick?: () => void
	fullWidth?: boolean
	disabled?: boolean
}

const SubmitButton = ({ className, children, type, onClick, fullWidth, disabled }: SubmitButtonType) => {
	return (
		<StyledButton
			disabled={disabled}
			className={disabled ? 'disable' : className}
			type={type}
			onClick={onClick}
			style={{ width: fullWidth ? '100%' : 'max-content' }}>
			{children}
		</StyledButton>
	)
}

export default SubmitButton

const StyledButton = styled.button`
	width: 100%;
	border: none;
	border-radius: 4px;
	padding: 8px 8px;

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
	&.disable {
		background-color: gray;
		&:hover {
			cursor: pointer;
		}
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

	&.important {
		background-color: ${({ theme }) => theme.colors.error};
		color: white;
		&:hover {
			background-color: ${({ theme }) => theme.colors.secondary};
		}
	}

	&.warn {
		background-color: ${({ theme }) => theme.colors.warning};
		color: white;
		&:hover {
			background-color: ${({ theme }) => theme.colors.secondary};
		}
	}

	svg {
		position: relative;
		top: 2px;
	}
`
