import React from 'react'
import MapView from './MapView'
import styled from 'styled-components'
import SubmitButton from '../../components/SubmitButton'
import InputLabel from '../../components/InputLabel'
import PageFooter from '../PageFooter'

const Contact = () => {
	return (
		<div>
			<Container>
				<h1>Skontaktuj się z Nami</h1>
				<p>
					Witamy w kinie "Cinema Fordon"! Cieszymy się, że jesteś zainteresowany/a nawiązaniem kontaktu z nami. Jesteśmy tu, aby odpowiedzieć na Twoje
					pytania, wysłuchać Twoich uwag lub pomóc w zorganizowaniu wyjątkowego wydarzenia w naszym kinie.
				</p>
				<div>
					<h1>Dane Kontaktowe</h1>
					<p>Adres: ul. Kaliskiego 7, 87-100 Bydgoszcz</p>
					<p>Telefon: +48 500 500 500</p>
					<p>E-mail: info@cinemafordon.com </p>
					<h1>Godziny Otwarcia</h1>
					<span>
						Jesteśmy dostępni dla Ciebie w następujących godzinach: <p>Poniedziałek - Piątek: 10:00 - 22:00</p>{' '}
						<p>Sobota - Niedziela: 12:00 - 24:00</p> Skontaktuj się z Nami Online Jeśli wolisz, możesz również skorzystać z naszych mediów
						społecznościowych, aby być na bieżąco z naszymi najnowszymi premierami, wydarzeniami specjalnymi i konkursami.{' '}
						<p>Facebook - Bądź na bieżąco z naszymi aktualnościami.</p> <p>Instagram - Podglądaj kulisy naszych wydarzeń.</p>{' '}
						<p>Twitter - Śledź nasze tweete i bierz udział w dyskusjach. </p>
					</span>
				</div>
				<h1>Skontaktuj się z nami</h1>
				<p>
					Formularz Kontaktowy Jeśli masz pytania lub uwagi, możesz również skorzystać z poniższego formularza kontaktowego. Postaramy się
					odpowiedzieć tak szybko, jak to możliwe.
				</p>
				<form
					id='contactForm'
					action='mailto:
					cinemafordon12@outlook.com'
					method='post'
					style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '20px', padding: '20px 0' }}>
					<InputLabel type='text' title={'Imię i Nazwisko:'} />
					<InputLabel type='text' title={'Adres E-mail:'} />
					<InputLabel type='text' title={'Wiadomość:'} />

					<SubmitButton className='primary' type='button'>
						Wyślij
					</SubmitButton>
				</form>

				<MapView />
				<p>
					Dziękujemy za zainteresowanie naszym kinem! Jesteśmy dumni, że możemy dostarczyć Ci niezapomniane chwile rozrywki. Czekamy na Twój kontakt!
					Z poważaniem, Zespół Cinema Fordon
				</p>
			</Container>
			<PageFooter />
		</div>
	)
}

export default Contact

const Container = styled.div`
	width: 50%;
	margin: 0 auto;
	color: white;

	h1 {
		font-family: 'Saira', sans-serif;
		text-align: center;
		padding: 20px 0;
	}
`
