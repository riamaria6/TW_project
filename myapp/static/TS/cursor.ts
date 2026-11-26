const cursor = document.createElement("div");
cursor.id = "cursor";
document.body.appendChild(cursor);

let hue: number = 285; 

document.addEventListener("mousemove", (e: MouseEvent) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

function animateColor(): void {
    hue = (hue + 1) % 360;
    cursor.style.backgroundColor = `hsl(${hue}, 90%, 60%)`;
    cursor.style.boxShadow = `0 0 15px hsl(${hue}, 90%, 60%)`;
    requestAnimationFrame(animateColor);
}

animateColor();