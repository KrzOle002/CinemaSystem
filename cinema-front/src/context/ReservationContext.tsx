import { ReactNode, createContext, useContext, useState } from 'react'

interface ReservationProviderProps {
	children: ReactNode
}

interface ReservationData {
	step: string
	setStep: (step: string) => void
}

interface Reservation {}

const ReservationContext = createContext<ReservationData | null>(null)

const ReservationProvider = ({ children }: ReservationProviderProps) => {
	const [step, setStep] = useState('payment')

	const [reservation, setReservation] = useState<Reservation | null>(null)

	const value: ReservationData = {
		step,
		setStep,
	}

	return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>
}

const useReservationContext = () => {
	const context = useContext(ReservationContext)

	if (!context) throw new Error('useReservationContext musi zostać użyty z ReservationContextProviderem.')

	return context
}

export { useReservationContext, ReservationContext, ReservationProvider }
