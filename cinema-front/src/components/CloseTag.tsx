import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface CloseTagType {
	link: string
}

const CloseTag = ({ link }: CloseTagType) => {
	return (
		<Wrapper>
			<Link to={link}>
				<StyledIcon icon={faXmark} size='2x' />
			</Link>
		</Wrapper>
	)
}

export default CloseTag

const Wrapper = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
`
const StyledIcon = styled(FontAwesomeIcon)`
	color: white;
	&:hover {
		color: ${({ theme }) => theme.colors.primary};
		cursor: pointer;
	}
`
