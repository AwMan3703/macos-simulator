function updateClocks() {
    const clocks = document.getElementsByClassName('real-time-clock');
    const timeStr = new Date().toLocaleString();

    for (let i = 0; i < clocks.length; i++) {
        const c = clocks[i];

        c.innerText = timeStr;
    }
}

// How much to wait before starting the periodic update, so our clocks sync up with the system one
const startDelta = 1000 - new Date().getMilliseconds()
// Initial update so we show something
updateClocks()
// Start regular updates at a delay
setTimeout(_ => {
    updateClocks()
    setInterval(_ => updateClocks(), 1000)
}, startDelta)