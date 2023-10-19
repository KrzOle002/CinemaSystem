import styled from 'styled-components'

interface InputLabelType {
	type?: string
	title?: string
	value?: string
	inputRef?: object
	required?: boolean
	className?: string
	disabled?: boolean
	onChange?: () => void
}
const InputLabel = ({ type, title, value, inputRef, required, className, disabled, onChange }: InputLabelType) => {
	return (
		<Wrapper>
			<Label>
				{title}
				{required ? <RequiredDot>*</RequiredDot> : null}
			</Label>
			<StyledInput
				disabled={disabled ? true : false}
				className={className}
				onChange={onChange}
				type={type}
				value={value}
				{...inputRef}
			/>
		</Wrapper>
	)
}

export default InputLabel

const Wrapper = styled.div`
	width: 100%;
`

const Label = styled.div`
	box-sizing: border-box;
	width: 100%;
	padding: 6px;
`

const StyledInput = styled.input`
	box-sizing: border-box;
	width: 100%;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	padding: 6px;
	transition: 0.1s linear;

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
