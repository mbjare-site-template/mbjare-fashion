const products = [
    { id: 1, name: "Casual T-Shirt", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: "men" },
    { id: 2, name: "Denim Jacket", price: 59.99, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3", category: "men" },
    { id: 3, name: "Summer Dress", price: 39.99, image: "https://images.unsplash.com/photo-1585487000160-6b3b8d22b9ef", category: "women" },
    { id: 4, name: "Sneakers", price: 79.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "footwear" },
    { id: 5, name: "Leather Belt", price: 24.99, image: "https://images.unsplash.com/photo-1591567464824-b9b0e46d01f3", category: "accessories" },
    { id: 6, name: "Floral Skirt", price: 34.99, image: "https://images.unsplash.com/photo-1582143407503-66f6e9e1f9e2", category: "women" },
    { id: 7, name: "Sports Shoes", price: 89.99, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782", category: "footwear" },
    { id: 8, name: "Sunglasses", price: 19.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f", category: "accessories" },
];

let cart = [];

function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover">
                <div class="p-6">
                    <h3 class="text-lg font-semibold">${product.name}</h3>
                    <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-700 transition">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = `
            <div class="cart-item flex justify-between items-center">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                    <div>
                        <h3 class="text-lg font-semibold">${item.name}</h3>
                        <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-600 hover:text-red-800 transition">Remove</button>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });

    cartCount.textContent = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const sortOption = document.getElementById('sort-filter').value;

    let filteredProducts = products.filter(product => {
        return (category === 'all' || product.category === category) &&
               product.name.toLowerCase().includes(searchQuery);
    });

    if (sortOption === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredProducts);
}

document.getElementById('search-bar').addEventListener('input', filterProducts);
document.getElementById('category-filter').addEventListener('change', filterProducts);
document.getElementById('sort-filter').addEventListener('change', filterProducts);
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout! (Demo functionality)');
});
document.getElementById('newsletter-btn').addEventListener('click', () => {
    const email = document.getElementById('newsletter-email').value;
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
    } else {
        alert('Please enter a valid email address.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});