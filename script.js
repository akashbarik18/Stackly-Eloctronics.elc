// DOM Elements
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
const searchBtn = document.getElementById('search-btn');
const searchForm = document.querySelector('.search-form');
const userBtn = document.getElementById('user-btn');
const loginForm = document.querySelector('.login-form-container');
const closeLoginBtn = document.getElementById('close-login-btn');
const productGrid = document.querySelector('.product-grid');
const newsletterForm = document.querySelector('.newsletter form');
const audio = document.getElementById('bgAudio');
const audioControl = document.getElementById('audioControl');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Toggle search bar
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchForm.style.display =
    searchForm.style.display === 'block' ? 'none' : 'block';
});

// User button redirect to login page
userBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'lg.html';
});

// Keep this if you still need to close login form
closeLoginBtn.addEventListener('click', () => {
  loginForm.classList.remove('active');
});
// Featured Products Data
const featuredProducts = [
    {
        id: 1,
        title: "Quantum X Pro Smartphone",
        category: "Smartphones",
        price: 899,
        oldPrice: 999,
        rating: 4.8,
        reviews: 124,
        badge: "new",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1367&q=80"
    },
    {
        id: 2,
        title: "Nebula Ultra Laptop",
        category: "Laptops",
        price: 1499,
        oldPrice: 1799,
        rating: 4.7,
        reviews: 89,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    },
    {
        id: 3,
        title: "Noise-Cancelling Headphones",
        category: "Headphones",
        price: 299,
        oldPrice: 349,
        rating: 4.9,
        reviews: 215,
        badge: "sale",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
        id: 4,
        title: "Galaxy Pro Smart Watch",
        category: "Smart Watches",
        price: 399,
        oldPrice: null,
        rating: 4.6,
        reviews: 76,
        badge: null,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80"
    },
    {
        id: 5,
        title: "Aurora 4K Smart TV",
        category: "Televisions",
        price: 1299,
        oldPrice: 1499,
        rating: 4.5,
        reviews: 187,
        badge: "sale",
        image: "https://cdn.pixabay.com/photo/2017/04/07/12/58/lion-2210947_1280.jpg"
    },
    {
        id: 6,
        title: "Thunder X Gaming Console",
        category: "Gaming",
        price: 499,
        oldPrice: null,
        rating: 4.9,
        reviews: 342,
        badge: "new",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80"
    },
    {
        id: 7,
        title: "Marshal Speaker",
        category: "Wireless Speaker",
        price: 899,
        oldPrice: null,
        rating: 4.9,
        reviews: 542,
        badge: "new",
        image: "https://cdn.pixabay.com/photo/2020/09/13/11/08/marshal-5567979_1280.jpg"
    },
    {
        id: 8,
        title: "crypto shine Keyboard",
        category: "Keyboard",
        price: 199,
        oldPrice: null,
        rating: 4.9,
        reviews: 642,
        badge: "new",
        image: "https://media.istockphoto.com/id/2168972818/photo/close-up-of-computer-keyboard.jpg?s=612x612&w=0&k=20&c=qvFjmej7YcYmxHJpxj76YnXnZihXMggh5FCw0Gf3Z-I="
    }
];

// ==================== CART FUNCTIONALITY ====================

// Get or initialize cart from localStorage
function getCart() {
    let cart = [];
    try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            cart = JSON.parse(cartData);
            if (!Array.isArray(cart)) {
                cart = [];
                localStorage.removeItem('cart');
            }
        }
    } catch (e) {
        cart = [];
        localStorage.removeItem('cart');
    }
    return cart;
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.title || product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
    showNotification(`${product.title || product.name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('cart-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        notification.className = 'cart-notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ==================== PRODUCT DISPLAY ====================

// Display Featured Products
function displayProducts() {
    productGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            ${product.badge ? `<span class="product-badge ${product.badge}">${product.badge === 'sale' ? 'Sale' : 'New'}</span>` : ''}
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-actions">
                    <a href="#" class="product-action-btn"><i class="fas fa-heart"></i></a>
                    <a href="#" class="product-action-btn"><i class="fas fa-eye"></i></a>
                    <a href="#" class="product-action-btn add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart"></i></a>
                </div>
            </div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Handle Add to Cart button clicks
function handleAddToCart(e) {
    if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('add-to-cart-btn')) {
        e.preventDefault();
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = featuredProducts.find(p => p.id === productId);
        if (product) {
            addToCart(product);
        }
    }
}

// ==================== NEWSLETTER FUNCTIONALITY ====================

// Show message function
function showMessage(title, text, type) {
    // Create message box if it doesn't exist
    let messageBox = document.getElementById('messageBox');
    if (!messageBox) {
        messageBox = document.createElement('div');
        messageBox.id = 'messageBox';
        messageBox.className = 'message';
        messageBox.innerHTML = `
            <div class="message-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} message-icon"></i>
                <div class="message-text">
                    <h3 class="message-title">${title}</h3>
                    <p id="messageText">${text}</p>
                </div>
            </div>
        `;
        document.body.appendChild(messageBox);
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .message {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transform: translateX(150%);
                transition: transform 0.3s ease;
                z-index: 1000;
                max-width: 300px;
                opacity: 0;
            }
            .message.visible {
                transform: translateX(0);
                opacity: 1;
            }
            .message.success {
                background-color: #4CAF50;
            }
            .message.error {
                background-color: #F44336;
            }
            .message-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .message-icon {
                font-size: 24px;
            }
            .message-text {
                flex: 1;
            }
            .message-title {
                margin: 0 0 5px 0;
                font-size: 16px;
            }
            #messageText {
                margin: 0;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
    } else {
        // Update existing message box
        messageBox.className = 'message';
        messageBox.classList.add(type);
        messageBox.querySelector('.message-icon').className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} message-icon`;
        messageBox.querySelector('.message-title').textContent = title;
        messageBox.querySelector('#messageText').textContent = text;
    }
    
    // Show message
    setTimeout(() => {
        messageBox.classList.add('visible');
    }, 10);
    
    // Hide after 4 seconds
    setTimeout(() => {
        messageBox.classList.remove('visible');
    }, 4000);
}

// Confetti effect
function createConfetti() {
    const colors = ['#e8c07d', '#2a5c6b', '#ffffff', '#9cbfcb'];
    const container = document.querySelector('.newsletter') || document.body;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.width = Math.random() * 8 + 5 + 'px';
        confetti.style.height = Math.random() * 8 + 5 + 'px';
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '1000';
        confetti.style.opacity = '0';
        container.appendChild(confetti);
        
        // Animate
        setTimeout(() => {
            confetti.style.opacity = '1';
            confetti.style.transition = `all ${Math.random() * 3 + 2}s ease-out`;
            confetti.style.top = '100vh';
            confetti.style.left = parseFloat(confetti.style.left) + (Math.random() * 200 - 100) + 'px';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Improved email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!emailPattern.test(email)) {
            showMessage('Oops!', 'Please enter a valid Gmail address (e.g. yourname@gmail.com)', 'error');
            return;
        }
        
        
        // Show success message
        showMessage('Thank You!', 'You have been subscribed to our newsletter', 'success');
        
        // Reset form
        newsletterForm.reset();
        
        // Add confetti effect
        createConfetti();
    });
}

// ==================== EVENT LISTENERS ====================

// Toggle Mobile Menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('fa-times');
});

// Toggle Search Form
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchForm.classList.toggle('active');
});

// Toggle Login Form
userBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('active');
});

closeLoginBtn.addEventListener('click', () => {
    loginForm.classList.remove('active');
});

// Close Search and Login Forms when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-form') && !e.target.closest('#search-btn')) {
        searchForm.classList.remove('active');
    }
    
    if (e.target === loginForm) {
        loginForm.classList.remove('active');
    }
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Product Grid Event Delegation
productGrid.addEventListener('click', handleAddToCart);

// ==================== AUDIO CONTROL ====================

let audioPlaying = false;

// Try to play audio automatically
const playAudio = () => {
    audio.play()
        .then(() => {
            audioPlaying = true;
            audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
        })
        .catch(error => {
            console.log('Auto-play prevented:', error);
            audioControl.style.display = 'flex';
        });
};

// Attempt to play audio after user interacts with page
document.body.addEventListener('click', function firstInteraction() {
    if (!audioPlaying) {
        playAudio();
    }
    document.body.removeEventListener('click', firstInteraction);
}, { once: true });

// Audio control button
audioControl.addEventListener('click', function() {
    if (audioPlaying) {
        audio.pause();
        audioPlaying = false;
        audioControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audio.play();
        audioPlaying = true;
        audioControl.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
});

// ==================== INITIALIZATION ====================

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});