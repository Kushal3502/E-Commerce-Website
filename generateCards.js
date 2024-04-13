export async function generateCards(container, data) {
    container.innerHTML = data.map(item => `
        <div class="card" id="${item.id}">
            <p class="category">${item.category}</p>
            <img src="${item.thumbnail}">
            <div class ="title-rating">
                <p class="title">${item.title}</p>
                <p class="rating">Rating : ${item.rating}</p>
            </div>
            <p class="price">Rs. ${item.price * 80}</p>
            <a href="#" class="view-details"><button class="add-to-cart-btn">Add to cart</button></a>
        </div>
    `).join(' ')

    container.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('add-to-cart-btn')) {
            // console.log(e.target.parentNode.parentNode.children[2].children[0].innerHTML);
            addToCart(e.target.parentNode.parentNode);
        }
    });
}

function addToCart(e) {
    
    console.log(e);
}