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
	placeholder?: string
	validation?: string
}
const InputLabel = ({
	type,
	title,
	value,
	inputRef,
	required,
	className,
	disabled,
	onChange,
	placeholder,
	validation,
}: InputLabelType) => {
	return (
		<Wrapper>
			{title ? (
				<Label>
					{title}
					{required ? <RequiredDot>*</RequiredDot> : null}
				</Label>
			) : null}
			<StyledInput
				placeholder={placeholder}
				disabled={disabled ? true : false}
				className={className}
				onChange={onChange}
				type={type}
				value={value}
				{...inputRef}
			/>
			{validation ? (
				<ValidationInfo>
					<RequiredDot>*</RequiredDot>
					{validation}
				</ValidationInfo>
			) : null}
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
	padding: 6px 0;
	font-family: 'Roboto';
`

const StyledInput = styled.input`
	box-sizing: border-box;
	width: 100%;
	border: 1px solid rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	line-height: 24px;
	padding: 6px;
	transition: 0.1s linear;
	font-family: 'Roboto';

	&.error {
		border: 1px solid rgb(255, 0, 0);
	}

	&:focus {
		outline: none;
	}
`

const RequiredDot = styled.span`
	color: #a50000;
	font-weight: 700;
`
const ValidationInfo = styled.span`
	font-family: 'Roboto';
	margin: 0;
	padding: 0;
	color: #a50000;
	font-size: 13px;
	text-align: left;
	font-weight: 700;
`
