const products = [
    { id: 1, name: "Casual T-Shirt", price: 29.99, image: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg", category: "men" },
    { id: 2, name: "Denim Jacket", price: 59.99, image: "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg", category: "men" },
    { id: 3, name: "Summer Dress", price: 39.99, image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg", category: "women" },
    { id: 4, name: "Sneakers", price: 79.99, image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg", category: "footwear" },
    { id: 5, name: "Leather Belt", price: 24.99, image: "https://images.pexels.com/photos/934360/pexels-photo-934360.jpeg", category: "accessories" },
    { id: 6, name: "Floral Skirt", price: 34.99, image: "https://images.pexels.com/photos/1456952/pexels-photo-1456952.jpeg", category: "women" },
    { id: 7, name: "Sports Shoes", price: 89.99, image: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg", category: "footwear" },
    { id: 8, name: "Sunglasses", price: 19.99, image: "https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg", category: "accessories" },
];

let cart = [];

function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover lazy" loading="lazy">
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                    <p class="text-gray-600 text-sm">$${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition font-medium">Add to Cart</button>
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
    const cartCountMobile = document.getElementById('cart-count-mobile');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = `
            <div class="cart-item flex justify-between items-center">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                        <p class="text-gray-600 text-sm">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-600 hover:text-red-800 transition">Remove</button>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });

    cartCount.textContent = cart.length;
    cartCountMobile.textContent = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const searchQuery = document.getElementById('search-bar').value.toLowerCase() || document.getElementById('mobile-search-bar').value.toLowerCase();
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

// Carousel Functionality
function initCarousel() {
    const carousel = document.getElementById('carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    let current = 0;

    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    setInterval(() => {
        current = (current + 1) % items.length;
        showSlide(current);
    }, 5000);
}

// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Cart Modal
document.getElementById('cart-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.remove('hidden');
});
document.getElementById('cart-close').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
});
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout! (Demo functionality)');
});

// Newsletter Signup
document.getElementById('newsletter-btn').addEventListener('click', () => {
    const email = document.getElementById('newsletter-email').value;
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
    } else {
        alert('Please enter a valid email address.');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (!this.getAttribute('href').startsWith('#cart')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Hide Loading Spinner
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initCarousel();
    document.getElementById('search-bar').addEventListener('input', filterProducts);
    document.getElementById('mobile-search-bar').addEventListener('input', filterProducts);
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('sort-filter').addEventListener('change', filterProducts);
});
