class FeaturesHandler {
    constructor() {
        this.contracts = [];
        this.negotiations = [];
        this.initializeFeatures();
    }

    initializeFeatures() {
        // Initialize Search
        const searchForm = document.querySelector('#search form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => this.handleSearch(e));
        }

        // Initialize Contracts
        const contractForm = document.querySelector('#contracts form');
        if (contractForm) {
            contractForm.addEventListener('submit', (e) => this.handleContractCreation(e));
        }

        // Initialize Negotiations
        const negotiationForm = document.querySelector('#negotiation form');
        if (negotiationForm) {
            negotiationForm.addEventListener('submit', (e) => this.handleNegotiation(e));
        }

        // Load existing data
        this.loadContracts();
        this.loadNegotiations();
    }

    handleSearch(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchParams = {
            cropType: formData.get('crop_type'),
            priceMin: formData.get('price_min'),
            priceMax: formData.get('price_max'),
            location: formData.get('location')
        };

        // Filter products based on search parameters
        const filteredProducts = this.filterProducts(searchParams);
        this.displaySearchResults(filteredProducts);
    }

    filterProducts(params) {
        return productHandler.products[params.cropType] || [];
    }

    displaySearchResults(products) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'farmer-card';
            productCard.innerHTML = `
                <h3>${product.farmerName}</h3>
                <div class="product-info">
                    <p><strong>Product:</strong> ${product.product}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Location:</strong> ${product.location}</p>
                </div>
                <button onclick="featuresHandler.initiateNegotiation(${product.id})" 
                        class="negotiate-btn">Start Negotiation</button>
            `;
            resultsContainer.appendChild(productCard);
        });

        // Replace existing results if any
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.replaceWith(resultsContainer);
        } else {
            document.querySelector('#search').appendChild(resultsContainer);
        }
    }

    handleContractCreation(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const contract = {
            id: Date.now(),
            farmerName: formData.get('farmer_name'),
            buyerName: formData.get('buyer_name'),
            terms: formData.get('contract_terms'),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        this.contracts.push(contract);
        this.saveContracts();
        this.displayContracts();
        e.target.reset();
    }

    handleNegotiation(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const negotiation = {
            id: Date.now(),
            productName: formData.get('product_name'),
            proposedPrice: formData.get('proposed_price'),
            message: formData.get('message'),
            status: 'pending',
            timestamp: new Date().toISOString()
        };

        this.negotiations.push(negotiation);
        this.saveNegotiations();
        this.displayNegotiations();
        e.target.reset();
    }

    initiateNegotiation(productId) {
        const product = this.findProduct(productId);
        if (product) {
            document.getElementById('product_name').value = product.product;
            document.getElementById('proposed_price').value = product.price.replace('$', '');
            document.querySelector('#negotiation').scrollIntoView({ behavior: 'smooth' });
        }
    }

    findProduct(productId) {
        for (const category in productHandler.products) {
            const product = productHandler.products[category].find(p => p.id === productId);
            if (product) return product;
        }
        return null;
    }

    saveContracts() {
        localStorage.setItem('contracts', JSON.stringify(this.contracts));
    }

    saveNegotiations() {
        localStorage.setItem('negotiations', JSON.stringify(this.negotiations));
    }

    loadContracts() {
        const saved = localStorage.getItem('contracts');
        if (saved) {
            this.contracts = JSON.parse(saved);
            this.displayContracts();
        }
    }

    loadNegotiations() {
        const saved = localStorage.getItem('negotiations');
        if (saved) {
            this.negotiations = JSON.parse(saved);
            this.displayNegotiations();
        }
    }

    displayContracts() {
        const container = document.createElement('div');
        container.className = 'contract-list';
        
        this.contracts.forEach(contract => {
            const contractCard = document.createElement('div');
            contractCard.className = 'contract-card';
            contractCard.innerHTML = `
                <h3>Contract #${contract.id}</h3>
                <p><strong>Farmer:</strong> ${contract.farmerName}</p>
                <p><strong>Buyer:</strong> ${contract.buyerName}</p>
                <p><strong>Terms:</strong> ${contract.terms}</p>
                <p><strong>Status:</strong> ${contract.status}</p>
                <p><strong>Created:</strong> ${new Date(contract.createdAt).toLocaleDateString()}</p>
            `;
            container.appendChild(contractCard);
        });

        // Replace existing contract list if any
        const existingList = document.querySelector('.contract-list');
        if (existingList) {
            existingList.replaceWith(container);
        } else {
            document.querySelector('#contracts').appendChild(container);
        }
    }

    displayNegotiations() {
        const container = document.createElement('div');
        container.className = 'negotiation-history';
        
        this.negotiations.forEach(negotiation => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message-bubble message-sent';
            messageDiv.innerHTML = `
                <p><strong>${negotiation.productName}</strong></p>
                <p>Proposed Price: $${negotiation.proposedPrice}</p>
                <p>${negotiation.message}</p>
                <small>${new Date(negotiation.timestamp).toLocaleString()}</small>
            `;
            container.appendChild(messageDiv);
        });

        // Replace existing negotiation history if any
        const existingHistory = document.querySelector('.negotiation-history');
        if (existingHistory) {
            existingHistory.replaceWith(container);
        } else {
            document.querySelector('#negotiation').appendChild(container);
        }
    }
}

// Initialize features handler
const featuresHandler = new FeaturesHandler();