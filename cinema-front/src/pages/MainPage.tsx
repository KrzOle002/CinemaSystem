import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Login from './AuthForm/Login'
import Register from './AuthForm/Register'
import Dashboard from './Dashboard/Dashboard'
import PageFooter from './PageFooter'

const MainPage = () => {
	return (
		<Wrapper>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='/' element={<Dashboard />} />
			</Routes>
			<PageFooter />
		</Wrapper>
	)
}

export default MainPage

export const Wrapper = styled.div`
	width: 100%;
	background: ${({ theme }) => theme.colors.original};
	background-attachment: fixed;
	display: flex;
	flex-direction: column;
	position: relative;
`
