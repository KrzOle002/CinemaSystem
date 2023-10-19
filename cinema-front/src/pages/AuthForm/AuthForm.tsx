import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Login from '../../utils/authentication/Login'
import Register from '../../utils/authentication/Register'

export const AuthForm = () => {
	return (
		<Wrapper>
			<AuthContainer>
				<BrowserRouter>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</BrowserRouter>
			</AuthContainer>
		</Wrapper>
	)
}

export const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`
export const AuthContainer = styled.div`
	@media screen and (max-width: 768px) {
	}
	width: 30%;
	border-radius: 10px;
	background-color: ${({ theme }) => theme.colors.whiterMid};
`
