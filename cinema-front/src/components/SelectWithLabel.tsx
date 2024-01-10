import styled from 'styled-components'
import { ReactNode } from 'react'

interface SelectLabelType {
	type?: string
	title?: string
	inputRef?: object
	required?: boolean
	className?: string
	children: ReactNode
	onChange?: (args: any) => void
	value?: string | number
}

const SelectWithLabel = ({ title, inputRef, required, className, children, onChange, value }: SelectLabelType) => {
	return (
		<Wrapper>
			<Label>
				{title}
				{required ? <RequiredDot>*</RequiredDot> : null}
			</Label>
			<StyledSelect value={value} onChange={onChange} className={className} {...inputRef}>
				{children}
			</StyledSelect>
		</Wrapper>
	)
}

export default SelectWithLabel

const Wrapper = styled.div`
	width: 100%;
`

const Label = styled.div`
	box-sizing: border-box;
	width: 100%;
	padding: 6px;
`

const StyledSelect = styled.select`
	box-sizing: border-box;
	width: 100%;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	padding: 6px;

	&.error {
		border: 1px solid rgba(255, 0, 0, 0.5);
	}

	:focus {
		outline: none;
	}
`

const RequiredDot = styled.span`
	color: red;
	font-weight: 700;
`
