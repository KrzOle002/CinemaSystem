import styled from 'styled-components'

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.colors.white};
	row-gap: 50px;
`
