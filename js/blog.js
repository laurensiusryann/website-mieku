// Blog Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('blog-search');
    const categorySelect = document.getElementById('category-select');
    const blogPosts = document.querySelectorAll('.blog-post');
    const itemsPerPage = 6;
    let currentPage = 1;

    // Search functionality
    searchInput.addEventListener('input', filterPosts);
    categorySelect.addEventListener('change', filterPosts);

    function filterPosts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        blogPosts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            const category = post.dataset.category;

            const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            post.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });

        updatePagination();
    }

    // Reading Time Calculator
    function calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    document.querySelectorAll('.blog-post').forEach(post => {
        const content = post.querySelector('p').textContent;
        const readingTime = calculateReadingTime(content);
        post.querySelector('.time').textContent = `${readingTime} min read`;
    });

    // Share Buttons
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            const postTitle = this.closest('.blog-post').querySelector('h2').textContent;
            const url = window.location.href;

            let shareUrl;
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + url)}`;
                    break;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    // Pagination
    function updatePagination() {
        const visiblePosts = Array.from(blogPosts).filter(post => post.style.display !== 'none');
        const totalPages = Math.ceil(visiblePosts.length / itemsPerPage);

        // Show posts for current page
        visiblePosts.forEach((post, index) => {
            post.style.display = index >= (currentPage - 1) * itemsPerPage && 
                                index < currentPage * itemsPerPage ? 'block' : 'none';
        });

        // Update pagination buttons
        const pageNumbers = document.querySelector('.page-numbers');
        pageNumbers.innerHTML = '';
        
        for(let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.toggle('active', i === currentPage);
            button.addEventListener('click', () => {
                currentPage = i;
                updatePagination();
            });
            pageNumbers.appendChild(button);
        }

        // Update prev/next buttons
        document.querySelector('.prev-page').disabled = currentPage === 1;
        document.querySelector('.next-page').disabled = currentPage === totalPages;
    }

    // Initialize pagination
    updatePagination();

    // Prev/Next page handlers
    document.querySelector('.prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    document.querySelector('.next-page').addEventListener('click', () => {
        const visiblePosts = Array.from(blogPosts).filter(post => post.style.display !== 'none');
        const totalPages = Math.ceil(visiblePosts.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // Lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
});