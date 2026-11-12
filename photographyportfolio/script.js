
// SIX PHOTOGRAPHS

const images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg"
];


// CURRENT PHOTO

let currentIndex = 0;
let isChanging = false;


// HTML ELEMENTS

const mainImage = document.getElementById("mainImage");
const counter = document.getElementById("counter");

const lightbox = document.getElementById("lightbox");
const expandedImage = document.getElementById("expandedImage");


// UPDATE COUNTER

function updateCounter() {
    const number = String(currentIndex + 1).padStart(2, "0");
    counter.textContent = number + " / 06";
}


// DISPLAY PHOTO WITH FADE

function updateSlide() {

    if (isChanging) return;

    isChanging = true;

    // Fade out current photo
    mainImage.classList.add("fading");

    setTimeout(() => {

        // Change photograph
        mainImage.src = images[currentIndex];
        expandedImage.src = images[currentIndex];

        updateCounter();

        // Fade new photo in
        mainImage.onload = () => {
            mainImage.classList.remove("fading");
            isChanging = false;
        };

        // Handle cached images
        if (mainImage.complete) {
            mainImage.classList.remove("fading");
            isChanging = false;
        }

    }, 800);
}


// MOVE BETWEEN PHOTOS

function changeSlide(direction) {

    if (isChanging) return;

    currentIndex += direction;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    updateSlide();
}


// SLIDESHOW ARROWS

document.getElementById("next").addEventListener("click", () => {
    changeSlide(1);
});

document.getElementById("previous").addEventListener("click", () => {
    changeSlide(-1);
});


// AUTOMATIC SLIDESHOW EVERY 5 SECONDS

setInterval(() => {

    if (!lightbox.classList.contains("active")) {
        changeSlide(1);
    }

}, 5000);


// OPEN EXPANDED PHOTO

mainImage.addEventListener("click", () => {

    expandedImage.src = images[currentIndex];

    lightbox.classList.add("active");

});


// CLOSE EXPANDED PHOTO

function closeLightbox() {
    lightbox.classList.remove("active");
}

document.getElementById("close").addEventListener("click", closeLightbox);


// EXPANDED PHOTO NAVIGATION

document.getElementById("lightboxNext").addEventListener("click", () => {
    changeSlide(1);
});

document.getElementById("lightboxPrevious").addEventListener("click", () => {
    changeSlide(-1);
});


// KEYBOARD CONTROLS

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        changeSlide(1);
    }

    if (event.key === "ArrowLeft") {
        changeSlide(-1);
    }

});


// START WEBSITE

updateCounter();
