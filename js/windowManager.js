const windowTemplate = document.getElementById("window-template")
const menuBar = document.getElementById("menu-bar")

function makeWindowDraggable(el) {
	const handle = document.getElementById(el.id + '-handle')
	let menuBarHeight = 0
	const updateMenuBarHeight = _ => menuBarHeight = parseInt(window.getComputedStyle(menuBar).height)
	updateMenuBarHeight()

	let dX = 0, dY = 0;

	const onDrag = (ev) => {
		if (ev.buttons===0) { document.removeEventListener('mousemove', onDrag); }
		let mX = ev.clientX, mY = ev.clientY;
		el.style.left = `${mX - dX + ev.movementX}px`;
		el.style.top = `${Math.max(mY - dY + ev.movementY, menuBarHeight)}px`;
	}

	handle.addEventListener('mousedown', (ev) => {
		let oGCS = window.getComputedStyle(el);
		dX = ev.clientX - parseInt(oGCS.left); //record the X delta between mouse and window's top-left corner
		dY = ev.clientY - parseInt(oGCS.top); //record the Y delta between mouse and window's top-left corner
		updateMenuBarHeight()
		document.addEventListener('mousemove', onDrag);
	});
}

function createWindow(src) {
	if (!("content" in document.createElement("template"))) { throw new Error("Templates not implemented") }

	const windowRoot = windowTemplate.content.cloneNode(true).childNodes[0]
	const windowBar = windowRoot.querySelector("div.window-bar")
	const closeBtn = windowBar.querySelector(".window-button.close")
	const minimizeBtn = windowBar.querySelector(".window-button.minimize")
	const fullscreenBtn = windowBar.querySelector(".window-button.fullscreen")
	const iframe = windowRoot.querySelector("iframe.window-content")

	const winId = crypto.randomUUID()

	windowRoot.id = `window_${winId}`

	windowBar.id = `${windowRoot.id}-handle`

	closeBtn.addEventListener('click', () => {
		windowRoot.style.opacity = '0';
		setTimeout(() => {
			windowRoot.remove();
		}, 200);
	});

	iframe.src = src

	return windowRoot
}

const spawnWindow = (x, y, w, h, winSrc) => {
	const new_window = createWindow(winSrc)

	document.getElementById('desktop').appendChild(new_window);

	new_window.style.top = `${y}px`
	new_window.style.left = `${x}px`
	new_window.style.width = w
	new_window.style.height = h
	makeWindowDraggable(new_window)
}
