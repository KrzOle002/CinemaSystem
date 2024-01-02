import { Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth } from 'react-auth-kit'
import Login from '../src/pages/AuthForm/Login'
import Register from '../src/pages/AuthForm/Register'
import Account from '../src/pages/Account/Account'
import MovieSchedule from '../src/pages/MovieSchedule/MovieSchedule'
import PurchaseForm from '../src/pages/PurchaseForm/PurchaseForm'
import Dashboard from '../src/pages/Dashboard/Dashboard'
import { ReservationProvider } from '../src/context/ReservationContext'
import Contact from '../src/pages/Contact/Contact'
import News from '../src/pages/News/News'
import Offer from '../src/pages/Offer/Offer'
import About from '../src/pages/About/About'
import MovieDetails from '../src/pages/MovieDetails/MovieDetails'
import Reservations from '../src/pages/Reservations/Reservations'
import AdminPanel from '../src/pages/AdminPanel/AdminPanel'

import { useUserAuthContext } from '../src/context/UserAuthContext'

const NavList = () => {
	const { isAdmin } = useUserAuthContext()
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
			<Route path='contact' element={<Contact />} />
			<Route path='offer' element={<Offer />} />
			<Route path='news' element={<News />} />
			<Route path='about' element={<About />} />
			<Route path='login' element={<Login />} />
			<Route path='register' element={<Register />} />
			<Route path='account' element={<Account />} />
			<Route path='schedule' element={<MovieSchedule />} />
			<Route path='details/:movieId' element={<MovieDetails />} />

			<Route path='admin-panel' element={<RequireAuth loginPath='/login'>{isAdmin ? <AdminPanel /> : <Dashboard />}</RequireAuth>} />

			<Route
				path='reservations'
				element={
					<RequireAuth loginPath='/login'>
						<Reservations />
					</RequireAuth>
				}
			/>
			<Route path='/' element={<Dashboard />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	)
}

export default NavList
