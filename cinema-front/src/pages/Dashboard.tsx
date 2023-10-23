import styled from 'styled-components'

const Dashboards = () => {
	return <Wrapper>Dashboards</Wrapper>
}

export default Dashboards

const Wrapper = styled.div`
	width: 60%;
	margin: 0 auto;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.original};
`
