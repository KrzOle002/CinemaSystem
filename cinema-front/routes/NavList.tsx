import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from 'react-auth-kit'
import Login from '../src/pages/AuthForm/Login'
import Register from '../src/pages/AuthForm/Register'
import Account from '../src/pages/Account/Account'
import MovieSchedule from '../src/pages/MovieSchedule/MovieSchedule'
import PurchaseForm from '../src/pages/PurchaseForm/PurchaseForm'
import Dashboard from '../src/pages/Dashboard/Dashboard'
import EmptyState from '../src/utils/empty/EmptyState'
const NavList = () => {
	return (
		<Routes>
			<Route path='login' element={<Login />} />
			<Route path='register' element={<Register />} />
			<Route path='/' element={<Dashboard />} />
			<Route path='purchase/:movieId' element={<PurchaseForm />} />
			<Route path='account' element={<Account />} />
			<Route path='schedule' element={<MovieSchedule />} />
		</Routes>
	)
}

export default NavList
