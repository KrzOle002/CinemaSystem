import { Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import { useMenuBarContext } from '../../context/MenuBarContext'
import { useNavigate } from 'react-router-dom'

const MenuBar = () => {
	const { isMenuBarOpen, toggleMenuBar } = useMenuBarContext()
	const navigate = useNavigate()
	return (
		<Drawer open={isMenuBarOpen} onClose={() => toggleMenuBar()} sx={{ zIndex: 100 }} disableScrollLock={true}>
			<div style={{ height: '66px' }} />
			<List sx={{ width: '150px', height: '100%' }}>
				<ListItemButton onClick={() => navigate('/schedule')}>
					<ListItemText primary='Repertuar' />
				</ListItemButton>

				<ListItemButton onClick={() => navigate('/offer')}>
					<ListItemText primary='Oferta' />
				</ListItemButton>

				<ListItemButton onClick={() => navigate('/news')}>
					<ListItemText primary='Aktualności' />
				</ListItemButton>

				<ListItemButton onClick={() => navigate('/about')}>
					<ListItemText primary='Kino' />
				</ListItemButton>

				<ListItemButton onClick={() => navigate('/contact')}>
					<ListItemText primary='Kontakt' />
				</ListItemButton>
			</List>
		</Drawer>
	)
}

export default MenuBar
