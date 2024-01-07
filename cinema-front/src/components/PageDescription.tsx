import styled from 'styled-components'

interface PageDescriptionType {
	children?: string
}

const PageDescription = ({ children }: PageDescriptionType) => {
	return <Wrapper>{children}</Wrapper>
}

export default PageDescription

const Wrapper = styled.p`
	font-size: ${({ theme }) => theme.fontSize.xxl};
	font-weight: bold;
	text-transform: uppercase;
`
