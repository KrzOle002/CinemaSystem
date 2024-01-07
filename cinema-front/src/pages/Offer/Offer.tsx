import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material'
import PageDescription from '../../components/PageDescription'
import PageFooter from '../PageFooter'

const offers = [
	{
		title: 'Na kocią łape',
		image: 'https://placekitten.com/300/200',
		description:
			'Ze względu na cieżkie czasy chcielibyśmy poinformować, że z hasłem "KOCIO" zbijamy cene biletu aż o 10 zł. Będzie to dobra okazja dla Ciebie i rodziny odpocząć od trudów dnia codziennego i zaoszczędzić ekstra kase. Zapraszamy',
	},
	{
		title: 'Seniorowe+',
		image:
			'https://media.istockphoto.com/id/1804274255/pl/zdj%C4%99cie/starsza-kobieta-ksi%C4%99gowa-p%C5%82atno%C5%9Bci-obliczanie-miesi%C4%99cznych-wydatk%C3%B3w-rachunki-bankowe.jpg?s=2048x2048&w=is&k=20&c=-4t7ycqErfW-HGadraFvGLHjQtk6dQBYKaYYXc3_h_M=',
		description:
			'Wszyscy seniorzy powyżej 65 roku zycia mają zniżkę -15% na zakup biletu stacjonarnie lub zwrot nadpłaconego biletu online o ilośc zniżki',
	},
	// Add more movie offers as needed
]

interface MovieCardType {
	title: string
	image: string
	description: string
}

const MovieCard = ({ title, image, description }: MovieCardType) => {
	return (
		<Card sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row' }}>
			<CardMedia sx={{ width: '100%', paddingTop: '56.25%' }} image={image} title={title} />
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant='h6' gutterBottom>
					{title}
				</Typography>
				<Typography>{description}</Typography>
			</CardContent>
		</Card>
	)
}

const Offer = () => {
	return (
		<>
			<Container maxWidth='md' sx={{ color: 'white', padding: '20px 0' }}>
				<Typography variant='h4' gutterBottom>
					<PageDescription>Oferty</PageDescription>
				</Typography>
				<Grid container spacing={4}>
					{offers.map((offer, index) => (
						<Grid item key={index} xs={12} sm={12}>
							<MovieCard {...offer} />
						</Grid>
					))}
				</Grid>
			</Container>
			<PageFooter />
		</>
	)
}

export default Offer
