export const screeningHours = [9, 11, 13, 15, 17, 19, 21]

export const getFullDate = (date: Date) => {
	const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()

	const myDate = `${day}.${month}.${year}`
	return <span>{myDate}</span>
}
