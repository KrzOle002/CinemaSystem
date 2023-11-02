import styled from 'styled-components'

const PageFooter = () => {
	return (
		<Wrapper>
			<Container>
				<Category>Linki</Category>
				<Category>Linki</Category>
				<Category>Linki</Category>
			</Container>
		</Wrapper>
	)
}

export default PageFooter

const Wrapper = styled.div`
	margin-top: 40px;
	border-radius: 50px 50px 0 0;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`
const Container = styled.div`
	width: 60%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
const Category = styled.div`
	width: 100%;
`
