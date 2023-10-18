import styled from 'styled-components'

interface AuthHeaderType {
	children: string
}

const AuthHeader = (props: AuthHeaderType) => {
	return <Paragraph>{props.children}</Paragraph>
}

export default AuthHeader

const Paragraph = styled.p`
	font-size: ${({ theme }) => theme.fontSize.xl};
	font-weight: 500;
`
