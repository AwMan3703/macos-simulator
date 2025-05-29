const minScale = document.getElementById("appicon-finder").offsetHeight;
const maxScale = 400;
const dock = document.getElementById("dock");
const appicons = Array.from(document.querySelectorAll("#dock button"));

let animationFrameId = null;
let mouseX = 0, mouseY = 0;

// Cache icon centers
const iconCenters = appicons.map(icon => {
    const rect = icon.getBoundingClientRect();
    return {
        element: icon,
        cx: rect.left + rect.width / 2,
        cy: rect.top + rect.height / 2
    };
});

function updateDockZoom() {
    const dockRect = dock.getBoundingClientRect();
    const insideDock =
        mouseX >= dockRect.left &&
        mouseX <= dockRect.right &&
        mouseY >= dockRect.top &&
        mouseY <= dockRect.bottom;

    for (const { element, cx, cy } of iconCenters) {
        if (!insideDock) {
            element.style.height = `${minScale}px`;
            element.style.marginTop = `0px`;
            continue;
        }

        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let scale = maxScale - distance;
        scale = Math.max(scale / 4, minScale);

        element.style.height = `${scale}px`;
        element.style.marginTop = `${minScale - scale}px`;
    }

    animationFrameId = null;
}

document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;

    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateDockZoom);
    }
});
