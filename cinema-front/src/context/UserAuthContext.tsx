import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit'

interface UserDataType {
	_id: string
	name: string
	surname: string
	email: string
	type: string
}

// Definicja typów dla kontekstu
interface UserAuthContextType {
	isAdmin: boolean
	fetchData: () => void
	userData: UserDataType | null
}

// Utworzenie kontekstu z domyślnymi wartościami
const UserAuthContext = createContext<UserAuthContextType>({
	isAdmin: false,
	fetchData: () => {},
	userData: {
		_id: '0',
		name: 'unknown',
		surname: 'unknown',
		email: 'unknown',
		type: 'unknown',
	},
})

export const useUserAuthContext = () => {
	return useContext(UserAuthContext)
}

interface UserAuthProviderType {
	children: React.ReactNode
}

export const UserAuthProvider = ({ children }: UserAuthProviderType) => {
	const [userData, setUserData] = useState<UserDataType | null>(null)
	const isAuthenticated = useIsAuthenticated()
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
		if (isAuthenticated()) {
			fetchData()
		}
	}, [isAuthenticated])

	const isAdmin = userData?.type === 'admin'

	return <UserAuthContext.Provider value={{ userData, isAdmin, fetchData }}>{children}</UserAuthContext.Provider>
}
