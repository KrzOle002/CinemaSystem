import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import HomeIcon from '@mui/icons-material/Home'
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined'
import VideocamIcon from '@mui/icons-material/Videocam'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthHook from '../auth/useAuth'
const Footer = () => {
	const navigate = useNavigate()
	const { isAuthenticated, axiosAuth, userData } = useAuthHook()
	const [avatarUrl, setAvatarUrl] = useState('')

	const api = import.meta.env.VITE_API_BASE_URL

	useEffect(() => {
		const fetchAvatar = async () => {
			if (isAuthenticated()) {
				try {
					const response = await axiosAuth.get(api + '/api/users/avatar', {})

					setAvatarUrl(response.data.avatar)
				} catch (error) {
					setAvatarUrl('')
				}
			}
		}
		fetchAvatar()
	}, [])

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
				onClick={() => navigate('/')}
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
				onClick={() => navigate('/schedule')}
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
				label={isAuthenticated() ? `${userData?.email}` : 'Konto'}
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
