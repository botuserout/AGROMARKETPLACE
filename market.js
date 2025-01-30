// Sample product data (in a real application, this would come from a backend)
const products = [
    {
        id: 1,
        category: 'grains',
        name: 'Organic Wheat',
        price: 299.99,
        quantity: '20 tons',
        location: 'Kansas, USA',
        emoji: '🌾'
    },
    {
        id: 2,
        category: 'nuts',
        name: 'Premium Almonds',
        price: 899.99,
        quantity: '5 tons',
        location: 'California, USA',
        emoji: '🥜'
    },
    {
        id: 3,
        category: 'coffee',
        name: 'Arabica Coffee Beans',
        price: 499.99,
        quantity: '10 tons',
        location: 'Colombia',
        emoji: '☕'
    },
    {
        id: 4,
        category: 'oils',
        name: 'Extra Virgin Olive Oil',
        price: 799.99,
        quantity: '5000 liters',
        location: 'Spain',
        emoji: '🫒'
    }
];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const searchInput = document.getElementById('searchProduct');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const sortFilter = document.getElementById('sortFilter');

// Function to format price in INR
function formatPriceInINR(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(price * 83); // Approximate USD to INR conversion (1 USD ≈ 83 INR)
}

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                ${product.emoji}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${formatPriceInINR(product.price)}</div>
                <div class="product-details">
                    <p>Quantity: ${product.quantity}</p>
                    <p>Location: ${product.location}</p>
                </div>
                <a href="#" class="product-button">View Details</a>
            </div>
        </div>
    `;
}

// Function to filter and display products
function filterAndDisplayProducts() {
    let filteredProducts = [...products];
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.location.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }
    
    // Apply price filter
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
    filteredProducts = filteredProducts.filter(product =>
        product.price >= minPrice && product.price <= maxPrice
    );
    
    // Apply sorting
    switch (sortFilter.value) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            // In this example, we'll keep the original order
            break;
    }
    
    // Display filtered products
    productsGrid.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Event listeners
searchBtn.addEventListener('click', filterAndDisplayProducts);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') filterAndDisplayProducts();
});
categoryFilter.addEventListener('change', filterAndDisplayProducts);
minPriceInput.addEventListener('change', filterAndDisplayProducts);
maxPriceInput.addEventListener('change', filterAndDisplayProducts);
sortFilter.addEventListener('change', filterAndDisplayProducts);

// Initial display
document.addEventListener('DOMContentLoaded', filterAndDisplayProducts);
