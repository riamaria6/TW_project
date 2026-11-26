"use strict";
const images = [
    "/static/MEDIA/uvt_logo.png",
    "/static/MEDIA/TWlogin.png",
    "/static/MEDIA/UVT_intrare.jpg",
    "/static/MEDIA/UVT_classroom.jpg"
    // Poți adăuga încă o imagine în folderul MEDIA și să o treci aici
];
const mainImage = document.getElementById("carousel-image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const galleryTitle = document.getElementById("gallery-title");
if (!mainImage)
    throw new Error("Imaginea caruselului nu a fost găsită!");
let currentIndex = 0;
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
}
function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    mainImage.src = images[currentIndex];
}
if (nextBtn)
    nextBtn.addEventListener("click", showNextImage);
if (prevBtn)
    prevBtn.addEventListener("click", showPrevImage);
setInterval(showNextImage, 3000);
let isHighlighted = false;
if (galleryTitle) {
    setInterval(() => {
        isHighlighted = !isHighlighted;
        galleryTitle.style.transform = isHighlighted ? "scale(1.08)" : "scale(1)";
        galleryTitle.style.color = isHighlighted ? "#752293" : "#4a155e";
    }, 1200);
}
