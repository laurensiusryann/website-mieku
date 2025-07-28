// Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        // Simulate form submission
        alert('Terima kasih! Pesan Anda telah terkirim.');
        this.reset();
    }
});

function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    inputs.forEach(input => {
        const errorMessage = input.nextElementSibling.nextElementSibling;
        
        // Reset error messages
        errorMessage.textContent = '';
        
        if (!input.value) {
            errorMessage.textContent = 'Field ini wajib diisi';
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            errorMessage.textContent = 'Format email tidak valid';
            isValid = false;
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            errorMessage.textContent = 'Format nomor telepon tidak valid';
            isValid = false;
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[\d\s-+()]{10,}$/.test(phone);
}

// Google Maps Integration
function initMap() {
    const location = { lat: -7.2575, lng: 112.7521 }; // Surabaya coordinates
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    });
    
    new google.maps.Marker({
        position: location,
        map: map,
        title: 'MieKu Express'
    });
}

// FAQ Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            if (faqItem !== item) {
                faqItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// FAQ Search
document.getElementById('faq-search').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchText) || answer.includes(searchText)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Live Chat Widget
const chatToggle = document.getElementById('toggle-chat');
const chatBody = document.querySelector('.chat-body');
let isChatOpen = false;

chatToggle.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    chatBody.style.display = isChatOpen ? 'block' : 'none';
});

// Simulate chat functionality
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const chatMessages = document.querySelector('.chat-messages');

chatButton.addEventListener('click', () => {
    if (chatInput.value.trim()) {
        addMessage('user', chatInput.value);
        // Simulate response after 1 second
        setTimeout(() => {
            addMessage('agent', 'Terima kasih atas pesannya. Tim kami akan segera menghubungi Anda.');
        }, 1000);
        chatInput.value = '';
    }
});

function addMessage(type, text) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize map when the API is loaded
window.initMap = initMap;