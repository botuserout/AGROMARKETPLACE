// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    function animateCounter() {
        const counter = document.querySelector('.counter');
        const target = parseInt(counter.textContent);
        let current = 0;
        
        const increment = Math.ceil(target / 100); // Divide animation into 100 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                counter.textContent = target;
            } else {
                counter.textContent = current;
            }
        }, 20);
    }
    async function translateText(text, targetLang) {
        const apiKey = 'devnagri_b629b26eddb711efa84a42010aa00fc7'; // Replace this with your actual API key
        const apiUrl = 'https://app.devnagri.com/machine-translation/v2/translate'; // Devnagri API endpoint
    
        const requestData = {
            api_key: apiKey,
            data: {
                [hi]: [en] // Format: { "language_code": ["text_to_translate"] }
            }
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
    
            const result = await response.json();
            if (result.status === 'success') {
                return result.data[targetLang][0]; // Translated text
            } else {
                console.error('Translation error:', result.message);
                return text; // Fallback to original text
            }
        } catch (error) {
            console.error('Error during API call:', error);
            return text; // Fallback to original text
        }
    }
    
    // Product Item Hover Effects
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            // Store the selected product
            const productName = this.querySelector('span:last-child').textContent;
            localStorage.setItem('selectedProduct', productName);
            
            // Redirect to market page (you can modify this URL)
            window.location.href = '/market';
        });
    });

    // Form Validation for Talk To Us button
    const talkBtn = document.querySelector('.talk-btn');
    talkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create and show modal
        const modal = createContactModal();
        document.body.appendChild(modal);
    });

    const languageSelector = document.querySelector('.language-selector select');
    const supportedLanguages = {
        en: 'English',
        hi: 'Hindi',
        bn: 'Bengali',
        ta: 'Tamil', 
        // Add more supported languages
    };
    
    Object.entries(supportedLanguages).forEach(([code, name]) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = name;
        languageSelector.appendChild(option);
    });
    
    languageSelector.addEventListener('change', async function() {
        const selectedLanguage = this.value;
        console.log('Selected language:', supportedLanguages[selectedLanguage]);
    
        // Translate an example element's text
        const elementToTranslate = document.querySelector('.example-text'); // Replace with your element
        const originalText = elementToTranslate.textContent;
        const translatedText = await translateText(originalText, selectedLanguage);
        elementToTranslate.textContent = translatedText;
    });
    
    // Sticky Navigation
    let lastScroll = 0;
    const mainNav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            mainNav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Helper function to create contact modal
    function createContactModal() {
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Contact Us</h2>
                <form id="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        `;

        // Add modal styles
        const styles = document.createElement('style');
        styles.textContent = `
            .contact-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .modal-content {
                background: white;
                padding: 20px;
                border-radius: 5px;
                width: 90%;
                max-width: 500px;
            }
            .close-modal {
                float: right;
                cursor: pointer;
                font-size: 24px;
            }
            #contact-form input,
            #contact-form textarea {
                width: 100%;
                margin: 10px 0;
                padding: 8px;
            }
            #contact-form button {
                background: #28a745;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(styles);

        // Add event listeners for modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());

        const form = modal.querySelector('#contact-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Message sent successfully!');
            modal.remove();
        });

        return modal;
    }

    // Initialize counter animation when page loads
    animateCounter();
});