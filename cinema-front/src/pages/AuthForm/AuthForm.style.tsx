import styled from 'styled-components'

export const Wrapper = styled.div`
	position: relative;
	background: ${({ theme }) => theme.gradient.main};
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const AuthContainer = styled.div`
	@media screen and (max-width: 640px) {
		width: 100%;
		border-radius: 10px;
		height: 100vh;
		border-radius: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	width: 400px;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.original};
`
export const Container = styled.form`
	@media screen and (max-width: 640px) {
	}
	width: 70%;
	padding: 70px 0;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.colors.white};
	row-gap: 20px;
`

export const HelpSection = styled.div`
	@media screen and (max-width: 640px) {
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		row-gap: 10px;
	}
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
`
