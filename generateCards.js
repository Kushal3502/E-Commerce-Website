export async function generateCards(container, data) {
  container.innerHTML = data
    .map(
      (item) => `
        <div class="card" id="${item.id}">
            <p class="category">${item.category}</p>
            <img src="${item.thumbnail}">
            <div class ="title-rating">
                <p class="title">${item.title}</p>
                <p class="rating">Rating : ${item.rating}</p>
            </div>
            <p class="price">Rs. ${(item.price * 80).toFixed(2)}</p> 
            <a href="#" class="view-details"><button class="add-to-cart-btn">Add to cart</button></a>
        </div>
    `
    )
    .join(" ");

  document
    .querySelectorAll(".add-to-cart-btn")
    .forEach((btn) => btn.addEventListener("click", addToLocalStorage));
}

function addToLocalStorage(e) {
  if (e.target && e.target.classList.contains("add-to-cart-btn")) {
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }

    const productId = e.target.parentNode.parentNode.getAttribute("id");
    const productName =
      e.target.parentNode.parentNode.querySelector(".title").textContent;
    const quantity = 1;
    const price = Number(
      e.target.parentNode.parentNode
        .querySelector(".price")
        .textContent.split(" ")[1]
    );
    const image = e.target.parentNode.parentNode.querySelector("img").src;

    // Check if the product is already in the cart
    const existingProductIndex = products.findIndex(
      (product) => product.name === productName
    );

    if (existingProductIndex !== -1) {
      // Update the quantity
      if (quantity !== 0) {
        products[existingProductIndex].quantity = quantity;
      } else {
        // If new quantity is zero, remove the product
        products.splice(existingProductIndex, 1);
      }
    } else {
      // If product is not in the cart, add it
      const productInfo = {
        id: productId,
        name: productName,
        quantity: quantity,
        price: price,
        image: image,
      };
      products.push(productInfo);
    }
    // Store the updated products array back into localStorage
    localStorage.setItem("products", JSON.stringify(products));
    console.log(JSON.parse(localStorage.getItem("products")));
  }
}
