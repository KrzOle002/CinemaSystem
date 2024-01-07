import { SxProps, Theme } from '@mui/material'
import { useState, useCallback, HTMLAttributes } from 'react'

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
	children?: any
	open?: boolean
	noFullScreen?: boolean
	onClose?: (event: any, reason: 'backdropClick' | 'escapeKeyDown' | 'other') => void
	width?: number | string
	height?: number | string
	loading?: boolean
	sx?: SxProps<Theme>
	error?: Error
}

export function useDialogHandler() {
	const [isOpen, setOpen] = useState(false)

	const open = useCallback(() => setOpen(true), [])
	const close = useCallback(() => setOpen(false), [])

	return {
		open,
		close,
		isOpen,
		dialogProps: {
			open: isOpen,
			onClose: close,
		},
	}
}
