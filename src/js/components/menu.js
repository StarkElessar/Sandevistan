import {
	bodyLockStatus,
	bodyLockToggle,
	bodyUnlock,
	bodyLock
} from '@js/helpers/bodyLockToggle'
import { html } from '@js/helpers/nodeList'

function menuInit() {
	if (document.querySelector('.icon-menu')) {
		document.addEventListener('click', e => {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle()
				html.classList.toggle('menu-open')
			} else if (bodyLockStatus && !e.target.closest('.menu__body')) {
				html.classList.remove('menu-open')
			}
		})
		document.addEventListener('keyup', e => {
			e.code === 'Escape' ? html.classList.remove('menu-open') : null
		})
	}
}
function menuOpen() {
	bodyLock()
	html.classList.add('menu-open')
}
function menuClose() {
	bodyUnlock()
	html.classList.remove('menu-open')
}

export { menuClose, menuOpen, menuInit }
