const cartItemsContainer = document.querySelector('.cart-items-container')
const itemPrices = document.querySelector('.item-prices')
let amount


const products = JSON.parse(localStorage.getItem('products'));
// console.log(products);
showProductInCart(products)



function showProductInCart(data) {
    data.forEach(item => {
        // console.log(item.name, item.quantity, item.price);

        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        cartItem.setAttribute('id', item.id)

        const image = document.createElement('img')
        image.src = item.image

        const productDetails = document.createElement('div')
        productDetails.classList.add('product-details')

        const name = document.createElement('h2')
        name.classList.add('item-name')
        name.textContent = item.name

        const price = document.createElement('p')
        price.classList.add('item-price')
        price.textContent = `Rs. ${item.price}`

        productDetails.appendChild(name)
        productDetails.appendChild(price)

        const quantityDetails = document.createElement('div')
        quantityDetails.classList.add('quantity-details')

        const quantityInput = document.createElement('div')
        quantityInput.classList.add('quantity-input')

        const decreaseBtn = document.createElement('button')
        decreaseBtn.classList.add('quantity-btn')
        decreaseBtn.classList.add('decrease-btn')
        decreaseBtn.textContent = '-'

        const quantityField = document.createElement('div')
        quantityField.classList.add('quantity-field')
        quantityField.textContent = item.quantity

        const increaseBtn = document.createElement('button')
        increaseBtn.classList.add('quantity-btn')
        increaseBtn.classList.add('increase-btn')
        increaseBtn.textContent = '+'

        quantityInput.appendChild(decreaseBtn)
        quantityInput.appendChild(quantityField)
        quantityInput.appendChild(increaseBtn)

        const removeItem = document.createElement('button')
        removeItem.classList.add('remove-item-btn')
        removeItem.textContent = 'Remove Item'

        quantityDetails.appendChild(quantityInput)
        quantityDetails.appendChild(removeItem)

        cartItem.appendChild(image)
        cartItem.appendChild(productDetails)
        cartItem.appendChild(quantityDetails)

        cartItemsContainer.appendChild(cartItem)

        // <-------------------- prices -------------------->
        const priceCard = document.createElement('div')
        priceCard.classList.add(`price-cart-card`)
        priceCard.classList.add(`cart-${item.id}`)

        const priceCardItemName = document.createElement('p')
        priceCardItemName.textContent = item.name

        const priceCardItemPrice = document.createElement('p')
        priceCardItemPrice.classList.add('price')
        priceCardItemPrice.textContent = `Rs. ${item.price * item.quantity}`

        priceCard.appendChild(priceCardItemName)
        priceCard.appendChild(priceCardItemPrice)

        itemPrices.appendChild(priceCard)
    });


    const cartValue = document.createElement('div')
    cartValue.classList.add('cart-value')

    amount = document.createElement('p')
    amount.classList.add('amount')
    updateTotalPrice()

    cartValue.appendChild(amount)

    itemPrices.appendChild(cartValue)

    document.querySelectorAll('.quantity-btn').forEach(btn => btn.addEventListener('click', manageQuantity))

    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // console.log(e.target.parentNode.parentNode);

            const productId = e.target.parentNode.parentNode.getAttribute('id')
            const existingProductIndex = products.findIndex(product => product.id === productId);

            products.splice(existingProductIndex, 1);

            console.log(productId);
            const deletedProduct = document.getElementById(`${productId}`)
            cartItemsContainer.removeChild(deletedProduct)

            const removePrice = document.querySelector(`.cart-${productId}`)
            itemPrices.removeChild(removePrice)

            localStorage.setItem('products', JSON.stringify(products));

            updateTotalPrice()
        })
    })
}


function manageQuantity(e) {
    let quantity = parseInt(e.target.parentNode.children[1].textContent)

    if (e.target.classList.contains('increase-btn')) {
        quantity += 1
        e.target.parentNode.children[1].textContent = quantity;
    }
    if (e.target.classList.contains('decrease-btn')) {
        if (quantity > 0) {
            quantity -= 1;
            e.target.parentNode.children[1].textContent = quantity;
        }
    }

    const productId = e.target.parentNode.parentNode.parentNode.getAttribute('id')
    const item = document.querySelector(`.cart-${productId}`)
    // console.log(productId);
    const existingProductIndex = products.findIndex(product => product.id === productId);

    if (quantity !== 0) {
        products[existingProductIndex].quantity = quantity;
        item.children[1].textContent = `Rs. ${products[existingProductIndex].price * products[existingProductIndex].quantity}`;
    } else {
        // If new quantity is zero, remove the product
        products.splice(existingProductIndex, 1);
        const deletedProduct = document.getElementById(`${productId}`)
        cartItemsContainer.removeChild(deletedProduct)

        const removePrice = document.querySelector(`.cart-${productId}`)
        itemPrices.removeChild(removePrice)
    }

    localStorage.setItem('products', JSON.stringify(products));

    updateTotalPrice()
}


function updateTotalPrice() {
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.price * product.quantity;
    });
    amount.textContent = `Total cart value is : Rs. ${totalPrice}`
}