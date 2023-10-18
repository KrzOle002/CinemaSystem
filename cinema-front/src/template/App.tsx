import MainPage from '../pages/MainPage'
import '@fontsource/saira-stencil-one'
import { AuthForm } from '../pages/AuthForm/AuthForm'
import { Wrapper } from './App.styles'

const App = () => {
	const isLogin = false

	return <Wrapper>{isLogin ? <MainPage /> : <AuthForm />}</Wrapper>
}

export default App
