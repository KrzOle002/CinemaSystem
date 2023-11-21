import { ReactNode, createContext, useContext, useState } from 'react'

interface ReservationProviderProps {
	children: ReactNode
}

interface ReservationData {
	step: string
	setStep: (step: string) => void
	reservation: Reservation | null
	setReservation: (reservation: Reservation | null) => void
}

export interface Reservation {
	active?: boolean | null
	screeningId?: string | null
	cost?: number | null
	screeningDate?: Date | null
	discountId?: string | null
	seats?: [string] | null
}

const ReservationContext = createContext<ReservationData | null>(null)

const ReservationProvider = ({ children }: ReservationProviderProps) => {
	const [step, setStep] = useState('tickets')

	const [reservation, setReservation] = useState<Reservation | null>(null)

	const value: ReservationData = {
		step,
		setStep,
		reservation,
		setReservation,
	}

	return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>
}

const useReservationContext = () => {
	const context = useContext(ReservationContext)

	if (!context) throw new Error('useReservationContext musi zostać użyty z ReservationContextProviderem.')

	return context
}

export { useReservationContext, ReservationContext, ReservationProvider }
