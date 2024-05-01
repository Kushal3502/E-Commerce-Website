import { generateCards } from "./generateCards.js"

const productCardContainer = document.querySelector('.product-card-container')

// <-------------------- generate categories -------------------->

const categoriesContainer = document.querySelector('.categories')
const categories = await fetch('https://dummyjson.com/products/categories')
const response = await categories.json()
// console.log(response);

categoriesContainer.innerHTML = response.map(item => `
    <button class="category-btn">
        <a class="category-btn">${item}</a>
    </button>
`).join(' ')


// <-------------------- generate all cards -------------------->

async function getData(limit) {
    const data = []
    for (let i = 0; i < limit; i++) {
        const id = Math.floor(Math.random() * 100) + 1
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const result = await response.json()
        // console.log(result);
        data[i] = result
    }
    return data
}

async function fetchData() {
    const data = await getData(32);
    // console.log(data);
    generateCards(productCardContainer, data)
}

fetchData();


// <-------------------- generate category-wise cards -------------------->

categoriesContainer.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target.classList.contains('category-btn')) {
        console.log(e.target.textContent);
        fetchCategoryData(e.target.textContent)
    }
})

async function getCategoryData(category) {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`)
    const data = await response.json()
    // console.log(data.products);
    return data.products
}

async function fetchCategoryData(category) {
    const data = await getCategoryData(category);
    console.log(data);
    generateCards(productCardContainer, data)
}
