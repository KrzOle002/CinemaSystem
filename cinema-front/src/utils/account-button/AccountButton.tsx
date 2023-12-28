import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { Popover, Typography } from '@mui/material'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import SubmitButton from '../../components/SubmitButton'
import useAuthHook from '../auth/useAuth'
import { useSignOut } from 'react-auth-kit'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AccountButton = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	const { userData } = useAuthHook()
	const navigate = useNavigate()
	const signOut = useSignOut()
	return (
		<>
			<LogoButton onClick={handleClick}>
				<AccountCircleOutlinedIcon fontSize='large' sx={{ width: '30px' }} />
				{userData?.email}
			</LogoButton>
			<Popover
				disableScrollLock={true}
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}>
				<StyledTypography>
					<SubmitButton
						type='button'
						className='secondary'
						fullWidth
						onClick={() => {
							signOut()
							toast.success('Wylogowano')
							navigate('/')
						}}>
						Moje zamówienia
					</SubmitButton>
					<SubmitButton
						type='button'
						className='secondary'
						fullWidth
						onClick={() => {
							signOut()
							toast.success('Wylogowano')
							navigate('/')
						}}>
						Moje oceny
					</SubmitButton>
					<SubmitButton
						type='button'
						className='secondary'
						fullWidth
						onClick={() => {
							signOut()
							toast.success('Wylogowano')
							navigate('/')
						}}>
						Ustawienia konta
					</SubmitButton>
					<SubmitButton
						type='button'
						className='secondary'
						fullWidth
						color='#f86887'
						onClick={() => {
							signOut()
							toast.success('Wylogowano')
							navigate('/')
						}}>
						Wyloguj
					</SubmitButton>
				</StyledTypography>
			</Popover>
		</>
	)
}

export default AccountButton

const LogoButton = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	&:hover {
		color: ${({ theme }) => theme.colors.secondary};
	}
`

const StyledTypography = styled(Typography)`
	background-color: ${({ theme }) => theme.colors.secondary};
	z-index: 1;
	max-width: 200px;
`
