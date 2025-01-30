// product-page.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeTabs();
    initializeFilters();
    initializeListings();
    initializeAddOfferForm();
    
    // Update the results counter
    updateResultsCount();
});

// Tab Switching Functionality
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const listingsContainer = document.querySelector('.listings');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Load relevant listings based on tab
            const tabType = tab.textContent.toLowerCase();
            loadListings(tabType);
        });
    });

    // Activate first tab by default
    if (tabs.length > 0) {
        tabs[0].click();
    }
}

// Filter Functionality
function initializeFilters() {
    const filterInputs = document.querySelectorAll('.filter-section select, .filter-section input');
    
    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            applyFilters();
        });
    });

    // Handle range inputs
    const rangeInputs = document.querySelectorAll('.range-input input');
    rangeInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateRangeInput(input);
            applyFilters();
        });
    });
}

function validateRangeInput(input) {
    const rangeGroup = input.closest('.range-input');
    const [fromInput, toInput] = rangeGroup.querySelectorAll('input');
    
    if (fromInput.value && toInput.value) {
        if (parseFloat(fromInput.value) > parseFloat(toInput.value)) {
            input.setCustomValidity('Range start must be less than range end');
        } else {
            input.setCustomValidity('');
        }
    }
}

function applyFilters() {
    const filters = collectFilterValues();
    const listings = document.querySelectorAll('.listing-card');
    
    listings.forEach(listing => {
        const matches = checkListingAgainstFilters(listing, filters);
        listing.style.display = matches ? 'block' : 'none';
    });
    
    updateResultsCount();
}

function collectFilterValues() {
    const filters = {};
    const filterInputs = document.querySelectorAll('.filter-section select, .filter-section input');
    
    filterInputs.forEach(input => {
        if (input.value) {
            const filterName = input.closest('div').previousElementSibling?.textContent.toLowerCase() || '';
            filters[filterName] = input.value;
        }
    });
    
    return filters;
}

// Listings Management
function initializeListings() {
    // Set up the "Show X entries" dropdown
    const showEntriesSelect = document.querySelector('.showing select');
    if (showEntriesSelect) {
        showEntriesSelect.addEventListener('change', (e) => {
            const limit = parseInt(e.target.value);
            loadListings(getCurrentTab(), limit);
        });
    }
}

function loadListings(type, limit = 10) {
    // In a real application, this would make an API call
    // For demo purposes, we'll create mock data
    const mockListings = generateMockListings(type, limit);
    displayListings(mockListings);
}

function generateMockListings(type, limit) {
    const listings = [];
    for (let i = 0; i < 5; i++) {
        listings.push({
            price: (Math.random() * 1000 + 500).toFixed(2),
            quantity: `${(Math.random() * 1000 + 100).toFixed(1)} MT`,
            location: 'FCA UA',
            sellerStatus: 'VERIFIED SELLER',
            expiryDays: Math.floor(Math.random() * 60)
        });
    }
    return listings;
}

function displayListings(listings) {
    const container = document.querySelector('.listings');
    container.innerHTML = '';
    
    listings.forEach(listing => {
        const card = createListingCard(listing);
        container.appendChild(card);
    });
}

function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.innerHTML = `
        <div class="price">€${listing.price}</div>
        <div class="quantity">${listing.quantity}</div>
        <div class="location">${listing.location}</div>
        <div class="seller-status">${listing.sellerStatus}</div>
        <div class="expiry">Expires in ${listing.expiryDays}d</div>
        <button class="details-btn">Click for details</button>
    `;
    
    // Add click handler for details button
    card.querySelector('.details-btn').addEventListener('click', () => {
        showListingDetails(listing);
    });
    
    return card;
}

// Add Offer Form
function initializeAddOfferForm() {
    const addOfferBtn = document.querySelector('.add-offer-btn');
    if (addOfferBtn) {
        addOfferBtn.addEventListener('click', showAddOfferModal);
    }
}

function showAddOfferModal() {
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Add New Offer</h3>
            <form id="newOfferForm">
                <div class="form-group">
                    <label>Price per MT (€)</label>
                    <input type="number" required min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label>Quantity (MT)</label>
                    <input type="number" required min="0">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="date" required>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="submit-btn">Add Offer</button>
                    <button type="button" class="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitNewOffer(form);
        modal.remove();
    });
    
    // Handle cancel
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
}

function submitNewOffer(form) {
    // Collect form data
    const formData = new FormData(form);
    const offerData = Object.fromEntries(formData.entries());
    
    // In a real application, this would make an API call
    console.log('Submitting new offer:', offerData);
    
    // Refresh listings
    loadListings(getCurrentTab());
}

// Utility Functions
function getCurrentTab() {
    const activeTab = document.querySelector('.tab.active');
    return activeTab ? activeTab.textContent.toLowerCase() : 'commodities';
}

function updateResultsCount() {
    const visibleListings = document.querySelectorAll('.listing-card:not([style*="display: none"])').length;
    const totalListings = document.querySelectorAll('.listing-card').length;
    
    const resultsText = `Showing ${visibleListings} of ${totalListings} entries`;
    // Update results count display if you have an element for it
    const resultsCounter = document.querySelector('.results-counter');
    if (resultsCounter) {
        resultsCounter.textContent = resultsText;
    }
}

// Show listing details
function showListingDetails(listing) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Listing Details</h3>
            <div class="listing-details">
                <p><strong>Price:</strong> €${listing.price}</p>
                <p><strong>Quantity:</strong> ${listing.quantity}</p>
                <p><strong>Location:</strong> ${listing.location}</p>
                <p><strong>Seller Status:</strong> ${listing.sellerStatus}</p>
                <p><strong>Expires in:</strong> ${listing.expiryDays} days</p>
            </div>
            <div class="form-buttons">
                <button type="button" class="submit-btn">Contact Seller</button>
                <button type="button" class="cancel-btn">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle close
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    // Handle contact seller
    modal.querySelector('.submit-btn').addEventListener('click', () => {
        alert('Contact form will open here');
        // Implement contact form functionality
    });
}