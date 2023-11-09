
import { Fab } from '@mui/material';
import { theme } from '../assets/styles/theme';

interface CircleAgeType {
	children?: number
}

const CircleAge = ({children}:CircleAgeType) => {
  return (
    <Fab style={{
      width: '30px', 
      height: '30px', 
      minHeight: '10px',
      backgroundColor: theme.colors.primary,
      color:theme.colors.white,
      marginRight: '10px'
    }}  aria-label="add">
    {children}
  </Fab>
  )
}

export default CircleAge

