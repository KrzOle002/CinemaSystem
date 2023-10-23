import { BrowserRouter, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from '../pages/MainPage'
import { Wrapper } from './App.styles'
import Navbar from '../utils/navigation/Navbar'

const App = () => {
	return (
		<Wrapper>
			<BrowserRouter>
				<Navbar />

				<MainPage />
			</BrowserRouter>
			<ToastContainer autoClose={750} />
		</Wrapper>
	)
}

export default App
