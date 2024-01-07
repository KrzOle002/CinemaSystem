import { Fab, Tooltip } from '@mui/material'
import { theme } from '../assets/styles/theme'

interface CircleAgeType {
	children?: number
}

const CircleAge = ({ children }: CircleAgeType) => {
	return (
		<Tooltip title={children ? `Ograniczenie wiekowe ${children} lat` : 'Dostępne dla każdego'} arrow>
			<Fab
				style={{
					zIndex: 5,
					width: '30px',
					height: '30px',
					minHeight: '10px',
					backgroundColor: theme.colors.primary,
					color: theme.colors.white,
					marginRight: '10px',
					fontSize: '16px',
				}}
				aria-label='add'>
				{children}
			</Fab>
		</Tooltip>
	)
}

export default CircleAge
