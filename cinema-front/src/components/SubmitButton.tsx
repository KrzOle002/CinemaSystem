import { ReactNode } from 'react'
import styled from 'styled-components'

interface SubmitButtonType {
	className?: string
	children?: ReactNode
	type: 'button' | 'submit' | 'reset' | undefined
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
	text-transform: uppercase;
	box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
	transition: 0.5s;
	font-weight: 700;
	font-size: 15px;
	line-height: 26px;
	letter-spacing: 0.46px;
	text-align: center;
	:hover {
		cursor: pointer;
	}

	&.primary {
		background-color: #0288d1;
		color: white;
		:hover {
			cursor: pointer;
			background-color: #014c75;
		}
	}

	&.secondary {
		background-color: #e0e0e0;
		:hover {
			background-color: #e0e0e0;
		}
	}

	&.error {
		background-color: #d32f2f;
		color: white;
		:hover {
			background-color: #8a1d1d;
		}
	}

	svg {
		position: relative;
		top: 2px;
	}
`
