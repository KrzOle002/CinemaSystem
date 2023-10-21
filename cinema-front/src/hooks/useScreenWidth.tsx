import { useState, useEffect } from 'react'

export function useScreenWidth() {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth)

	const updateScreenWidth = () => {
		setScreenWidth(window.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', updateScreenWidth)

		return () => {
			window.removeEventListener('resize', updateScreenWidth)
		}
	}, [])

	return screenWidth
}
