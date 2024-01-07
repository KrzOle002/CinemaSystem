import styled from 'styled-components'
import PageFooter from '../PageFooter'
import cinemaPhoto from '../../assets/old-cinema.jpeg'
const About = () => {
	return (
		<div>
			<Container>
				<h1>O naszym kinie</h1>
				<p>
					Witajcie w Cinema Fordon - miejscu, gdzie marzenia stają się obrazem, a wspomnienia układają się w sekwencje filmowe. Nasza historia sięga
					daleko wstecz, do czasów, gdy Fordon był jeszcze niewielką społecznością o wielkich marzeniach.
				</p>
				<p>
					Historia Cinema Fordon zaczęła się w malutkim pomieszczeniu, gdzie grupa pasjonatów filmu zbierała się, by wspólnie delektować się klasykami
					kina. Z każdym seansowym doświadczeniem rośnie nasza miłość do tego magicznego świata, aż postanowiliśmy podzielić się nią z całym Fordonem.
				</p>
				<p>
					Wraz z rozwojem społeczności, Cinema Fordon przechodziło metamorfozę. Z małego klubu filmowego stało się nowoczesnym kinem, oferującym
					najnowsze produkcje światowego kina. Nasze ekrany świecą dziś jasno, a dźwięk filmowy rozbrzmiewa w sercach naszych widzów.
				</p>
				<h1>Współczesność</h1>
				<p>
					Dziś Cinema Fordon to nie tylko miejsce na seanse filmowe. To centrum kulturalne, gdzie odbywają się premiery, spotkania z twórcami
					filmowymi i różnorodne wydarzenia społecznościowe. Chcemy, aby Cinema Fordon było nie tylko kinem, ale przestrzenią, gdzie ludzie spotykają
					się, dzielą swoje pasje i tworzą niezapomniane chwile.
				</p>
				<h1>Zapraszamy do Cinema Fordon</h1>
				<p>
					Bez względu na to, czy jesteś stałym bywalcem, czy pierwszy raz kroczysz do naszych drzwi, witamy Cię serdecznie w Cinema Fordon. Zanurz się
					w świat filmowej magii, doświadczaj emocji razem z nami i twórz razem z nami historię kina na Fordonie.
				</p>
				<PhotoContainer>
					<PhotoImage src={cinemaPhoto} />
				</PhotoContainer>
			</Container>
			<PageFooter />
		</div>
	)
}

export default About

const Container = styled.div`
	width: 50%;
	margin: 0 auto;
	color: white;
	padding: 0 0 20px 0;
	h1 {
		font-family: 'Saira', sans-serif;
		text-align: center;
		padding: 20px 0;
	}
`

const PhotoContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	border-radius: 8px;
	overflow: hidden;
`

const PhotoImage = styled.img`
	width: 100%;
	height: auto;
`
