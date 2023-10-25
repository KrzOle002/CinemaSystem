import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from '../pages/MainPage'
import Nav from '../utils/navigation/Nav'
import { Wrapper } from './App.styles'
import { MenuBarProvider } from '../context/MenuBarContext'

const App = () => {
	return (
		<MenuBarProvider>
			<Wrapper>
				<BrowserRouter>
					<Nav />
					<MainPage />
				</BrowserRouter>
				<ToastContainer autoClose={750} />
			</Wrapper>
		</MenuBarProvider>
	)
}

export default App
