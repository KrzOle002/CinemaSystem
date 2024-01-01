import axios from 'axios'
import { useEffect, useState } from 'react'

import { useAuthHeader, useAuthUser, useIsAuthenticated } from 'react-auth-kit'

const useAuthHook = () => {
	interface UserDataType {
		_id: string
		name: string
		surname: string
		email: string
		type: string
	}
	const isAuthenticated = useIsAuthenticated()
	const [userData, setUserData] = useState<UserDataType | null>(null)
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
	const fetchData = async () => {
		if (isAuthenticated()) {
			try {
				const response = await axiosAuth.get(api + '/api/auth/me', {})
				setUserData(response.data)
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			}
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	const isAdmin = userData?.type == 'admin'
	return {
		axiosAuth,
		isAdmin,
		userData,
		isAuthenticated,
		userName,
		authHead,
		api,
	}
}

export default useAuthHook
