import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainPage from '../pages/MainPage'
import Nav from '../utils/navigation/Nav'
import { Wrapper } from './App.styles'
import { MenuBarProvider } from '../context/MenuBarContext'
import Footer from '../utils/footer/Footer'
import { useScreenWidth } from '../hooks/useScreenWidth'
import { AuthProvider } from 'react-auth-kit'
import { FUNDING, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const App = () => {
	const resolution = useScreenWidth()
	return (
		<PayPalScriptProvider
			options={{
				clientId: import.meta.env.VITE_PAYPAL_KEY,
				currency: 'PLN',
				enableFunding: [FUNDING.P24, FUNDING.PAYU, FUNDING.BLIK],
				components: ['buttons', 'payment-fields', 'marks', 'funding-eligibility'],
			}}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<MenuBarProvider>
					<Wrapper>
						<AuthProvider
							authType={'cookie'}
							authName={'_auth'}
							cookieDomain={window.location.hostname}
							cookieSecure={window.location.protocol === 'https:'}>
							<BrowserRouter>
								<Nav />
								<MainPage />
								{resolution < 600 ? <Footer /> : null}
							</BrowserRouter>
						</AuthProvider>
						<ToastContainer autoClose={750} />
					</Wrapper>
				</MenuBarProvider>
			</LocalizationProvider>
		</PayPalScriptProvider>
	)
}

export default App
