document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const addProductForm = document.getElementById('addProductForm');

    // Add Event Listener to Form
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Input Values
        const productName = document.getElementById('productName').value.trim();
        const productIcon = document.getElementById('productIcon').value.trim();

        if (productName && productIcon) {
            // Create New Product Item
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.setAttribute('data-product', productName.toLowerCase());

            productItem.innerHTML = `
                <span class="product-icon">${productIcon}</span>
                <span>${productName.toUpperCase()}</span>
            `;

            // Add Click Event to New Product
            productItem.addEventListener('click', () => {
                alert(`You selected ${productName.toUpperCase()}!`);
            });

            // Append New Product to Grid
            productGrid.appendChild(productItem);

            // Clear Form Fields
            addProductForm.reset();
        } else {
            alert('Please fill out both fields.');
        }
    });

    // Counter Animation
    const counterElement = document.querySelector('.agr-counter .counter');
    if (counterElement) {
        let counter = 0;
        const target = parseInt(counterElement.textContent, 10);
        const increment = Math.ceil(target / 100);

        const updateCounter = () => {
            counter += increment;
            if (counter >= target) {
                counterElement.textContent = target;
            } else {
                counterElement.textContent = counter;
                requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    }
});
