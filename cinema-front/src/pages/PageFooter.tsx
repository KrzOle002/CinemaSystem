import styled from 'styled-components'
import NavigationLink from '../components/NavigationLink'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
const PageFooter = () => {
	return (
		<Wrapper>
			<Container>
				<Category>
					<CategoryHeader>Odwiedź sekcje</CategoryHeader>
					<NavigationLink link={''} size={''}>
						Repertuar
					</NavigationLink>
					<NavigationLink link={''} size={''}>
						Oferta
					</NavigationLink>
					<NavigationLink link={''} size={''}>
						Aktualności
					</NavigationLink>
					<NavigationLink link={''} size={''}>
						Kino
					</NavigationLink>
				</Category>
				<Category>
					<CategoryHeader>Kontakt</CategoryHeader>
					<CategoryContent href='tel:+48500500500'>+48 500 500 500</CategoryContent>
					<CategoryContent href='mailto:kino@cinemafordon.pl'>kino@cinemafordon.pl</CategoryContent>
					<CategoryContent href='/'>CinemaFordon.pl</CategoryContent>
				</Category>
				<Category>
					<CategoryHeader>Autor</CategoryHeader>
					<CategoryContent href='https://github.com/KrzOle002' target='_blank'>
						<GitHubIcon />
						GitHub
					</CategoryContent>
					<CategoryContent href='https://www.linkedin.com/in/krzysztof-olejniczak-28a344218/' target='_blank'>
						<LinkedInIcon />
						LinkedIn
					</CategoryContent>
				</Category>
				<div style={{ height: '1px' }} />
			</Container>
		</Wrapper>
	)
}

export default PageFooter

const Wrapper = styled.div`
	bottom: 0;
	min-width: 0;
	width: 100%;
	margin-top: 40px;
	border-radius: 0 0;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	padding: 40px 0;
`
const Container = styled.div`
	@media screen and (max-width: 640px) {
		flex-direction: column;
		row-gap: 40px;
	}
	width: 60%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	text-align: center;
`
const Category = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	row-gap: 10px;
`
const CategoryHeader = styled.span`
	font-size: 20px;
`
const CategoryContent = styled.a`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	column-gap: 5px;
	&:link {
		color: ${({ theme }) => theme.colors.white};
		text-decoration: none;
	}

	&:hover {
		color: ${({ theme }) => theme.colors.secondary};
		text-decoration: underline;
	}
	&:active {
		color: ${({ theme }) => theme.colors.white};
		text-decoration: none;
	}
	&:visited {
		color: ${({ theme }) => theme.colors.white};
		text-decoration: none;
	}
`
