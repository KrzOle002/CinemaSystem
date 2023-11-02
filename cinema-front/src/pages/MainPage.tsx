import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Login from './AuthForm/Login'
import Register from './AuthForm/Register'
import Dashboard from './Dashboard/Dashboard'
import PageFooter from './PageFooter'
import PurchaseForm from './PurchaseForm/PurchaseForm'
import { RequireAuth } from 'react-auth-kit'
import Account from './Account/Account'
const MainPage = () => {
	return (
		<Wrapper>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='/' element={<Dashboard />} />
				<Route path='purchase' element={<PurchaseForm />} />
				<Route path='account' element={<Account />} />
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
