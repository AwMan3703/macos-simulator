function stdout(text) {
	const newline = document.createElement("p");
	newline.innerText = text
	newline.dataset.timestamp = `[${new Date().toLocaleTimeString().toUpperCase()}]`
	document.getElementById("stdout").appendChild(newline);
}