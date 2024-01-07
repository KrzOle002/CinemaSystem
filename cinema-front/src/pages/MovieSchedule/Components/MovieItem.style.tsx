import styled from 'styled-components'
import SubmitButton from '../../../components/SubmitButton'

export const Wrapper = styled.div`
	color: ${({ theme }) => theme.colors.white};
	width: 100%;
`

export const MovieImage = styled.img`
	@media screen and (max-width: 640px) {
		margin: 0;
	}
	max-width: 150px;
	margin-right: 20px;
	border-radius: 10px;
	&:hover {
		filter: brightness(0.7);
		cursor: pointer;
	}
`

export const MovieInfo = styled.div`
	@media screen and (max-width: 1100px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	flex: 2;
`

export const MovieItemContainer = styled.div`
	@media screen and (max-width: 1100px) {
		flex-direction: column;
		justify-content: center;
	}
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 10px;
`

export const MovieTitle = styled.h3`
	@media screen and (max-width: 640px) {
		font-size: small;
	}
	text-transform: uppercase;
`

export const MovieBasicInfo = styled.div`
	@media screen and (max-width: 640px) {
		font-size: smaller;
	}
	text-transform: capitalize;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 5px;
`
export const MovieButtons = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	margin: 5px;
`
export const ControlButton = styled(SubmitButton)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
