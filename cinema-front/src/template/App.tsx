import '@fontsource/saira-stencil-one'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { Wrapper } from './App.styles'
import Login from '../pages/AuthForm/Login'
import Register from '../pages/AuthForm/Register'
import Dashboard from '../pages/Dashboard'

const App = () => {
	return (
		<Wrapper>
			<BrowserRouter>
				<Link to='/login'>Authform</Link>

				<Routes>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />

					<Route path='/' element={<Dashboard />} />
				</Routes>
			</BrowserRouter>
		</Wrapper>
	)
}

export default App
