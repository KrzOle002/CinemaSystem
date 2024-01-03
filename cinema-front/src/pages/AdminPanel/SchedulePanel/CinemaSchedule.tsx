import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface Movie {
	id: string
	title: string
	duration: number // Duration in minutes
}

const initialMovies: Movie[] = [
	{ id: 'movie-1', title: 'Film 1', duration: 120 },
	{ id: 'movie-2', title: 'Film 2', duration: 90 },
	// Dodaj więcej filmów według potrzeb
]

const CinemaSchedule = () => {
	const [movies, setMovies] = useState(initialMovies)

	const handleDragEnd = (result: any) => {
		if (!result.destination) {
			return
		}

		const items = Array.from(movies)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		setMovies(items)
	}

	const calculateSchedule = (movies: Movie[]) => {
		const schedule = []
		let currentTime = 9 * 60 // Kino zaczyna działanie o 9:00 (w minutach od północy)

		for (const movie of movies) {
			const startTime = formatTime(currentTime)
			currentTime += movie.duration
			const endTime = formatTime(currentTime)

			schedule.push({ ...movie, startTime, endTime })
		}

		return schedule
	}

	const formatTime = (minutes: number) => {
		const hours = Math.floor(minutes / 60)
		const mins = minutes % 60
		return `${hours}:${mins.toString().padStart(2, '0')}`
	}

	const movieSchedule = calculateSchedule(movies)

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId='droppable'>
				{provided => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{movieSchedule.map((movie, index) => (
							<Draggable key={movie.id} draggableId={movie.id} index={index}>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={{
											...provided.draggableProps.style,
											margin: '0 0 8px 0',
											padding: '16px',
											background: 'lightgrey',
											borderRadius: '4px',
										}}>
										{movie.title} - {movie.startTime} do {movie.endTime}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default CinemaSchedule
