import { styled } from 'styled-components'
import NavigationLink from '../../components/NavigationLink'

const DesktopNav = () => {
	return (
		<Wrapper>
			<NavigationLink link={'/'} size={'20px'}>
				Repertuar
			</NavigationLink>
			<NavigationLink link={'/'} size={'20px'}>
				Oferta
			</NavigationLink>
			<NavigationLink link={'/'} size={'20px'}>
				Aktualności
			</NavigationLink>
			<NavigationLink link={'/'} size={'20px'}>
				Kino
			</NavigationLink>
			<NavigationLink link={'/'} size={'20px'}>
				Kontakt
			</NavigationLink>
		</Wrapper>
	)
}

export default DesktopNav

export const Wrapper = styled.div`
	width: 35%;
	min-width: 500px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`
