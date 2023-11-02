import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam'
import HomeIcon from '@mui/icons-material/Home'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useNavigate } from 'react-router-dom'
import { useAuthHeader, useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import axios from 'axios'
import { useEffect, useState } from 'react'
const Footer = () => {
	const navigate = useNavigate()
	const isAuthenticated = useIsAuthenticated()
	const [avatarUrl, setAvatarUrl] = useState('')
	const auth = useAuthUser()
	const userName = auth() != null ? auth()?.email : 'User'
	const authHead = useAuthHeader()
	const authH = authHead()
	const api = import.meta.env.VITE_API_BASE_URL
	const authenticated = isAuthenticated()

	const myAxios = axios.create({
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': `${authH.slice(7)}`,
		},
	})
	const fetchAvatar = async () => {
		try {
			const response = await myAxios.get(api + '/api/users/avatar', {})
			console.log(response.data.avatar)
			setAvatarUrl(response.data.avatar)
		} catch (error) {
			console.error('Błąd podczas pobierania awatara:', error)
		}
	}

	fetchAvatar()

	return (
		<BottomNavigation
			showLabels
			sx={{
				backgroundColor: '#D0153F ',
				position: 'sticky',
				bottom: '0',
				minWidth: '0',
				width: '100%',
				zIndex: 100,
				fontSize: '9px',
			}}>
			<BottomNavigationAction
				onClick={() => navigate('/purchase')}
				label='Home'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<HomeIcon />}
			/>
			<BottomNavigationAction
				label='Repertuar'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<VideocamIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Aktualności'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<BallotOutlinedIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Kontakt'
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',
					'& span': {
						fontSize: '9px',
					},
					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				icon={<PermPhoneMsgOutlinedIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate(isAuthenticated() ? '/account' : '/login')}
				sx={{
					color: '#f5f5f5',
					fontSize: '9px',
					minWidth: '0',

					'& span': {
						fontSize: '9px',
					},

					'& button': {
						padding: '0',
						minWidth: '0',
					},
				}}
				label={isAuthenticated() ? `${userName}` : 'Konto'}
				icon={
					isAuthenticated() ? (
						<img style={{ width: 'auto', height: '24px', borderRadius: '20px' }} src={avatarUrl} />
					) : (
						<AccountCircleOutlinedIcon />
					)
				}
			/>
		</BottomNavigation>
	)
}

export default Footer
