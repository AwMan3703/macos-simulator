const dropdown_controller_class = 'dropdown-open'
const dropdown_containers = document.querySelectorAll('*:has(> .dropdown-menu)')

function getDropdownContents(dropdown_container) {
	const dropdown_menu = dropdown_container.querySelector('.dropdown-menu')
	if (!dropdown_menu) { return [ null, null ] }
	const dropdown_items = dropdown_menu.children
	return [ dropdown_menu, dropdown_items ]
}

dropdown_containers.forEach(dropdown_container => {
	const [ menu, items ] = getDropdownContents(dropdown_container)
	const zIndex = parseInt(window.getComputedStyle(dropdown_container).zIndex) || 0
	menu.style.zIndex = `${zIndex + 1}`

	dropdown_container.addEventListener('mouseenter', _ => {
		dropdown_container.classList.add(dropdown_controller_class)
	})
	dropdown_container.addEventListener('mouseleave', _ => {
		if (!menu.querySelector(`.${dropdown_controller_class}`)) { // If there are no open dropdowns
			dropdown_container.classList.remove(dropdown_controller_class)
		}
	})
})