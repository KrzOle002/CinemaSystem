import styled from 'styled-components'
import MoviePanel from './MoviePanel/MoviePanel'
import SchedulePanel from './SchedulePanel/SchedulePanel'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
const AdminPanel = () => {
	const [expanded, setExpanded] = useState<string | false>(false)

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<Wrapper>
			<Container>
				<StyledAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
						<Typography sx={{ width: '100%', textAlign: 'center' }}>Zarządzanie filmami</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<MoviePanel />
					</AccordionDetails>
				</StyledAccordion>
				<StyledAccordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2bh-content' id='panel2bh-header'>
						<Typography sx={{ width: '100%', textAlign: 'center' }}>Zarządzanie repertuarem</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							<SchedulePanel />
						</Typography>
					</AccordionDetails>
				</StyledAccordion>
			</Container>
		</Wrapper>
	)
}

export default AdminPanel

const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: 100%;
`
const Container = styled.div`
	height: 100%;
	align-items: center;
	justify-content: center;

	margin: 0 auto;
`
const StyledAccordion = styled(Accordion)`
	background-color: '#ff963f';
`
