const dropdown_controller_class = 'dropdown-open'
const dropdown_containers = document.querySelectorAll('*:has(> .dropdown-menu)')

const get_dropdown_contents = (dropdown_container) => {
	const dropdown_menu = dropdown_container.querySelector('.dropdown-menu')
	if (!dropdown_menu) { return null }
	const dropdown_items = dropdown_menu.children
	return [ dropdown_menu, dropdown_items ]
}

dropdown_containers.forEach(dropdown_container => {
	/// FIXME: whatever is wrong with this
	const rect = dropdown_container.getBoundingClientRect()
	console.log(rect.width || 0, rect.left || 0, (rect.width || 0) + (rect.left || 0))
	get_dropdown_contents(dropdown_container)[0].style.left = `${(rect.width || 0) + (rect.left || 0)}px`
})

dropdown_containers.forEach(dropdown_container => {
	dropdown_container.addEventListener('mouseenter', _ => {
		dropdown_container.classList.add(dropdown_controller_class)
	})
	dropdown_container.addEventListener('mouseleave', _ => {
		const [ menu, items ] = get_dropdown_contents(dropdown_container)
		if (!menu.querySelector(`.${dropdown_controller_class}`)) { // If there are no open dropdowns
			dropdown_container.classList.remove(dropdown_controller_class)
		}
	})
})