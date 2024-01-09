import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PostScreeningType, ScreeningData } from './SchedulePanel'
import useAuthHook from '../../../utils/auth/useAuth'
import SelectWithLabel from '../../../components/SelectWithLabel'
import { useForm } from 'react-hook-form'

interface ScheduleItemType {
	setPostScreening: (arg: PostScreeningType) => void
	postScreening: PostScreeningType
	index: number
}

interface Movie {
	_id: string
	uid?: string
	title: string
	screeningLength: number
}

const ScheduleItem = ({}: ScheduleItemType) => {
	const [movieList, setMovieList] = useState<Movie[]>([])
	const { api } = useAuthHook()
	const fetchData = async () => {
		try {
			const response = await axios.get(api + '/api/movie/movies')
			setMovieList(response.data)
		} catch (error) {
			setMovieList([])
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const addData = (value: any, type: string) => {}
	return (
		<div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
			{}

			<SelectWithLabel onChange={event => addData(event.target.value, 'movieId')} title='Film'>
				{movieList.map(movie => (
					<option key={movie._id} value={movie._id}>
						{movie.title}
					</option>
				))}
			</SelectWithLabel>
		</div>
	)
}

export default ScheduleItem
