import CloseIcon from '@mui/icons-material/Close'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

interface CloseTagType {
	link: string
}

const CloseTag = ({ link }: CloseTagType) => {
	return (
		<Wrapper>
			<Link to={link}>
				<StyledIcon style={{ fontSize: '45px' }} />
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
const StyledIcon = styled(CloseIcon)`
	color: white;
	&:hover {
		color: ${({ theme }) => theme.colors.primary};
		cursor: pointer;
	}
`
