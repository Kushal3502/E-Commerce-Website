import { generateCards } from "./generateCards.js";

// <-------------------- image slider -------------------->

const sliderImageLinks = [
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/6d230c8f55f6c661.png?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/464af6c9de766fc2.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/76bd20564897279a.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5a51a6ffa84d75a7.png?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1716f18fdf7edbbb.png?q=20",
];

function imageSlider() {
  const sliderImageContainer = document.querySelector(".slider");
  const dotsContainer = document.querySelector(".dots-container");

  function displaySlidesDots() {
    sliderImageLinks.forEach((src, index) => {
      const sliderImage = document.createElement("div");
      sliderImage.classList.add("slide");

      const image = document.createElement("img");
      image.src = src;
      image.setAttribute("index", index);

      const dots = document.createElement("div");
      dots.classList.add("dot");
      index == 0 ? dots.classList.add("active") : "";
      dots.setAttribute("data-slide", index);

      sliderImage.appendChild(image);

      sliderImageContainer.appendChild(sliderImage);

      dotsContainer.appendChild(dots);
    });
  }

  displaySlidesDots();

  setTimeout(() => {
    const slide = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentSlide = 0;

    function manageDots(currentSlide) {
      document
        .querySelectorAll(".dot")
        .forEach((currentSlide) => currentSlide.classList.remove("active"));
      document
        .querySelector(`.dot[data-slide='${currentSlide}']`)
        .classList.add("active");
    }

    function manageSlides(currentSlide) {
      slide.forEach(
        (slideItem, index) =>
          (slideItem.style.transform = `translateX(${
            100 * (index - currentSlide)
          }%)`)
      );
    }

    prevBtn.addEventListener("click", () => {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      manageDots(currentSlide);
      manageSlides(currentSlide);
    });

    nextBtn.addEventListener("click", () => {
      currentSlide++;
      if (currentSlide > slide.length - 1) {
        currentSlide = 0;
      }
      manageDots(currentSlide);
      manageSlides(currentSlide);
    });

    dotsContainer.addEventListener("click", (e) => {
      currentSlide = e.target.dataset.slide;
      manageDots(e.target.dataset.slide);
      manageSlides(e.target.dataset.slide);
    });

    setInterval(() => {
      currentSlide++;
      if (currentSlide > slide.length - 1) {
        currentSlide = 0;
      }
      manageDots(currentSlide);
      manageSlides(currentSlide);
    }, 2000);
  }, 2000);
}

imageSlider();

// <-------------------- random products -------------------->

async function getData(limit) {
  const data = [];
  for (let i = 0; i < limit; i++) {
    const id = Math.floor(Math.random() * 100) + 1;
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await response.json();
    // console.log(result);
    data[i] = result;
  }
  return data;
}

const randomCardContainer = document.querySelector(".random-card-container");
async function fetchData() {
  const data = await getData(5);
  console.log(data);
  generateCards(randomCardContainer, data);
}

fetchData();
