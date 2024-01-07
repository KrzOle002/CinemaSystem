import styled from 'styled-components'

interface SectionHeaderType {
	children?: string
}

const SectionHeader = ({ children }: SectionHeaderType) => {
	return <Header>{children}</Header>
}

export default SectionHeader

const Header = styled.p`
	@media screen and (max-width: 640px) {
		font-size: 24px;
		line-height: 24px;
		text-align: center;
	}
	font-size: 36px;
	line-height: 36px;
	margin-top: 0px;
	margin-bottom: 20px;
	font-family: 'Saira Stencil One', sans-serif;
	text-transform: uppercase;
`
