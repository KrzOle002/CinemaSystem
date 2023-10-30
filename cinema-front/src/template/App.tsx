import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from '../pages/MainPage'
import Nav from '../utils/navigation/Nav'
import { Wrapper } from './App.styles'
import { MenuBarProvider } from '../context/MenuBarContext'
import Footer from '../utils/footer/Footer'
import { useScreenWidth } from '../hooks/useScreenWidth'

const App = () => {
	const resolution = useScreenWidth()
	return (
		<MenuBarProvider>
			<Wrapper>
				<BrowserRouter>
					<Nav />
					<MainPage />
					{resolution < 600 ? <Footer /> : null}
				</BrowserRouter>
				<ToastContainer autoClose={750} />
			</Wrapper>
		</MenuBarProvider>
	)
}

export default App
