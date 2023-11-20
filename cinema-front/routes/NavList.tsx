import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from 'react-auth-kit'
import Login from '../src/pages/AuthForm/Login'
import Register from '../src/pages/AuthForm/Register'
import Account from '../src/pages/Account/Account'
import MovieSchedule from '../src/pages/MovieSchedule/MovieSchedule'
import PurchaseForm from '../src/pages/PurchaseForm/PurchaseForm'
import Dashboard from '../src/pages/Dashboard/Dashboard'
import EmptyState from '../src/utils/empty/EmptyState'
import { ReservationProvider } from '../src/context/ReservationContext'

const NavList = () => {
	return (
		<Routes>
			<Route
				path='purchase/:movieId'
				element={
					<ReservationProvider>
						<PurchaseForm />
					</ReservationProvider>
				}
			/>
			<Route path='login' element={<Login />} />
			<Route path='register' element={<Register />} />
			<Route path='account' element={<Account />} />
			<Route path='schedule' element={<MovieSchedule />} />
			<Route path='/' element={<Dashboard />} />
		</Routes>
	)
}

export default NavList
