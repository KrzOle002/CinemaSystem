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
		text-align: center;
	}
	font-size: 36px;
	font-family: 'Saira Stencil One', sans-serif;
	text-transform: uppercase;
`
