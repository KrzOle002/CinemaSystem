import { Drawer, List, ListItemButton, ListItemText } from '@mui/material'
import { useMenuBarContext } from '../../context/MenuBarContext'
import { useNavigate } from 'react-router-dom'

const MenuBar = () => {
	const { isMenuBarOpen, toggleMenuBar } = useMenuBarContext()
	const navigate = useNavigate()
	return (
		<Drawer open={isMenuBarOpen} onClose={() => toggleMenuBar()}>
			<div style={{ height: '66px' }} />
			<List sx={{ width: '150px', height: '100%' }}>
				<ListItemButton>
					<ListItemText primary='Repertuar' onClick={() => navigate('/schedule')} />
				</ListItemButton>

				<ListItemButton>
					<ListItemText primary='Oferta' onClick={() => navigate('/')} />
				</ListItemButton>

				<ListItemButton>
					<ListItemText primary='Aktualności' onClick={() => navigate('/')} />
				</ListItemButton>

				<ListItemButton>
					<ListItemText primary='Kino' onClick={() => navigate('/')} />
				</ListItemButton>

				<ListItemButton>
					<ListItemText primary='Kontakt' onClick={() => navigate('/')} />
				</ListItemButton>
			</List>
		</Drawer>
	)
}

export default MenuBar
