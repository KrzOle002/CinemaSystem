import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugin: Partial<VitePWAOptions> = {
	registerType: 'prompt',
	includeAssets: ['icon512_maskable.png', 'icon512_rounded.png'],
	manifest: {
		short_name: 'CinemaFordon',
		name: 'Cinema Fordon',
		description: 'Cinema Fordon App',
		icons: [
			{ purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
			{ purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' },
		],
		start_url: '/',
		background_color: '#FFFFFF',
		display: 'standalone',
		scope: '/',
		theme_color: '#000000',
		orientation: 'portrait',
	},
}

export default defineConfig({
	base: './',
	plugins: [react(), VitePWA(manifestForPlugin)],
	server: {
		host: '0.0.0.0',
	},
})
