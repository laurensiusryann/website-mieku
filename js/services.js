// Menu Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.dataset.category;
            
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Price Calculator
    const customOrderForm = document.getElementById('custom-order-form');
    if (customOrderForm) {
        customOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculatePrice();
        });
    }
});

// Price Calculator Function
function calculatePrice() {
    const basePrice = {
        'regular': 25000,
        'tipis': 23000,
        'tebal': 27000
    };

    const form = document.getElementById('custom-order-form');
    const baseType = form.base.value;
    let totalPrice = basePrice[baseType] || 0;

    // Add additional options pricing logic here

    // Display total price
    alert(`Total Harga: Rp ${totalPrice.toLocaleString()}`);
}

// Order Button Handler
document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const itemName = this.parentElement.querySelector('h3').textContent;
        alert(`Terima kasih telah memesan ${itemName}! Pesanan Anda sedang diproses.`);
    });
});

// Package Selection Handler
document.querySelectorAll('.package-column .order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const packageName = this.parentElement.querySelector('h3').textContent;
        alert(`Anda telah memilih ${packageName}! Silakan lengkapi detail pesanan Anda.`);
    });
});