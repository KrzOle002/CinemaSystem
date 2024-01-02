import axios from 'axios'

import { useAuthHeader, useAuthUser, useIsAuthenticated } from 'react-auth-kit'

const useAuthHook = () => {
	const isAuthenticated = useIsAuthenticated()

	const auth = useAuthUser()
	const userName = auth() != null ? auth()?.email : ''
	const authHeaderData = useAuthHeader()
	const authHead = authHeaderData().slice(7)

	const axiosAuth = axios.create({
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': `${authHead}`,
		},
	})
	const api = import.meta.env.VITE_API_BASE_URL

	return {
		isAuthenticated,
		axiosAuth,
		userName,
		authHead,
		api,
	}
}

export default useAuthHook
