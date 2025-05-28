const batteryDisplay = document.querySelector(".real-time-battery")
const toDisplayLevel = l => Math.round(l * 100) + '% 🀰∙'
const setDisplayLevel = l => batteryDisplay.innerText = toDisplayLevel(l)

if (!navigator.getBattery) {
    console.warn("navigator.getBattery is not available, switching to fake percentage.")
    let level = 1
    setDisplayLevel(level)
    setInterval(_ => {
        level -= .01
        setDisplayLevel(level)
    }, 10_000) // Pretty optimistic
} else {
    navigator.getBattery().then(battery => {
        setDisplayLevel(battery.level)

        battery.addEventListener('levelchange', _ => {
            setDisplayLevel(battery.level)
        })
    })
}