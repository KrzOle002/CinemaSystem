import { ReactNode, createContext, useContext, useState } from 'react'

const MenuBarContext = createContext({
	isMenuBarOpen: false,
	toggleMenuBar: () => {},
})

export const useMenuBarContext = () => {
	return useContext(MenuBarContext)
}

interface MenuBarProviderType {
	children: ReactNode
}

export const MenuBarProvider = ({ children }: MenuBarProviderType) => {
	const [isMenuBarOpen, setIsMenuBarOpen] = useState(false)

	const toggleMenuBar = () => {
		setIsMenuBarOpen(prevIsMenuBarOpen => !prevIsMenuBarOpen)
	}

	return <MenuBarContext.Provider value={{ isMenuBarOpen, toggleMenuBar }}>{children}</MenuBarContext.Provider>
}
