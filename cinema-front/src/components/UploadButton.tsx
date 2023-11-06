import { useState } from 'react'
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
const UploadButton = ({ inputRef, disabled, placeholder, validation }: InputLabelType) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
		} else {
			setSelectedFile(null)
		}
	}

	return (
		<Wrapper>
			<HiddenInput disabled={disabled ? true : false} type='file' id='file' onChange={handleFileChange} {...inputRef} />
			{validation ? (
				<ValidationInfo>
					<RequiredDot>*</RequiredDot>
					{validation}
				</ValidationInfo>
			) : null}
			<StyledButton htmlFor='file'>{selectedFile ? selectedFile.name : placeholder}</StyledButton>
		</Wrapper>
	)
}

export default UploadButton

const HiddenInput = styled.input`
	display: none;
`
const StyledButton = styled.label`
	cursor: pointer;
	padding: 10px 20px;
	background-color: #3498db;
	color: white;
	border-radius: 5px;
`
const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
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
const RequiredDot = styled.span`
	color: #a50000;
	font-weight: 700;
`
