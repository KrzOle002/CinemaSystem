import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam'
import HomeIcon from '@mui/icons-material/Home'
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined'
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
	const navigate = useNavigate()
	return (
		<BottomNavigation
			showLabels
			sx={{ backgroundColor: '#D0153F ', position: 'absolute', bottom: '0', minWidth: '0', width: '100%' }}>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Home'
				sx={{ color: '#f5f5f5', fontSize: '10px' }}
				icon={<HomeIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Repertuar'
				sx={{ color: '#f5f5f5', fontSize: '10px' }}
				icon={<VideocamIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Aktualności'
				sx={{ color: '#f5f5f5', fontSize: '10px' }}
				icon={<BallotOutlinedIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/')}
				label='Kontakt'
				sx={{ color: '#f5f5f5', fontSize: '10px' }}
				icon={<PermPhoneMsgOutlinedIcon />}
			/>
			<BottomNavigationAction
				onClick={() => navigate('/login')}
				label='Konto'
				sx={{ color: '#f5f5f5', fontSize: '10px' }}
				icon={<AccountCircleOutlinedIcon />}
			/>
		</BottomNavigation>
	)
}

export default Footer
