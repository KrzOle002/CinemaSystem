import { ReactNode, createContext, useContext, useState } from 'react'

interface ReservationProviderProps {
	children: ReactNode
}

interface ReservationData {
	step: string
	setStep: (step: string) => void
	reservation: Reservation | null
	setReservation: (reservation: Reservation | null) => void
	customer: CustomerType | null
	setCustomer: (customer: CustomerType | null) => void
}

export interface Reservation {
	active?: boolean | null
	screeningId?: string | null
	cost?: number | null
	screeningDate?: Date | null
	discountId?: string | null
	seats?: string[] | null
	customer?: CustomerType | null
}

export interface CustomerType {
	name: string
	surname: string
	email: string
	phoneNumber?: number
}
const ReservationContext = createContext<ReservationData | null>(null)

const ReservationProvider = ({ children }: ReservationProviderProps) => {
	const [step, setStep] = useState('payment')

	const [reservation, setReservation] = useState<Reservation | null>(null)

	const [customer, setCustomer] = useState<CustomerType | null>(null)

	const value: ReservationData = {
		step,
		setStep,
		reservation,
		setReservation,
		customer,
		setCustomer,
	}

	return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>
}

const useReservationContext = () => {
	const context = useContext(ReservationContext)

	if (!context) throw new Error('useReservationContext musi zostać użyty z ReservationContextProviderem.')

	return context
}

export { useReservationContext, ReservationContext, ReservationProvider }
