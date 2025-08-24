// Book Store Application JavaScript

// Global Variables
let booksData = [];
let filteredBooks = [];
let currentPage = 1;
const booksPerPage = 6;
let currentView = 'grid';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Book Data with provided stock photos
const bookDatabase = [
    // Programming Books
    {
        id: 1,
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        category: "Programming",
        price: 45.99,
        rating: 4.8,
        cover: "https://pixabay.com/get/gd57a08def393fa7dd453544ea1a30b49a70cd325faac48774cb54c12e2bc38b298e824a15103be063232ed1a2039fc4c1a0d432a0b9fb5b28b9e4eeefa865273_1280.jpg",
        description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.",
        formats: ["PDF", "EPUB"],
        preview: "Learn the principles of writing clean, maintainable code..."
    },
    {
        id: 2,
        title: "JavaScript: The Definitive Guide",
        author: "David Flanagan",
        category: "Programming",
        price: 52.99,
        rating: 4.6,
        cover: "https://pixabay.com/get/g2456f90c740e8a4b8241ed2a4b69fd19c04baba17cf64aa67750f2aeff4877bb33ec82215846e9973832ae141dfe610436d085c46f7d18bfef4635534b1e547d_1280.jpg",
        description: "Master the World's Most-Used Programming Language. For web developers and other programmers interested in using JavaScript, this bestselling book provides the most comprehensive JavaScript material on the market.",
        formats: ["PDF", "EPUB"],
        preview: "From basics to advanced concepts in JavaScript programming..."
    },
    {
        id: 3,
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        author: "Gang of Four",
        category: "Programming",
        price: 48.99,
        rating: 4.7,
        cover: "https://pixabay.com/get/g63d74c5834b73749e7d28c8f7530313fc07c3fdb9a0baeaadeb765348b8d8f6b7af7108f1a9a7eb7e9fcb3484a99dbdee79c8fd6fc7096c54eb4cb909b879169_1280.jpg",
        description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
        formats: ["PDF", "EPUB"],
        preview: "Essential design patterns for object-oriented programming..."
    },
    {
        id: 4,
        title: "The Pragmatic Programmer",
        author: "David Thomas & Andrew Hunt",
        category: "Programming",
        price: 44.99,
        rating: 4.9,
        cover: "https://pixabay.com/get/g4f8cb05c6a22c04a5ea0ca699a1f801eeed43e246cde7e373ab60560d6b21134f2b9fcd6951bcecc5312e7e5065ab927bf7ecd697bb2497d7bd3bf1621c3b8fd_1280.jpg",
        description: "Your journey to mastery. Written as a series of self-contained sections and filled with entertaining anecdotes, thoughtful examples, and interesting analogies.",
        formats: ["PDF", "EPUB"],
        preview: "From journeyman to master programmer..."
    },

    // Novels
    {
        id: 5,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Novels",
        price: 12.99,
        rating: 4.2,
        cover: "https://pixabay.com/get/geb82788590cbd71949996df3e504dd25b832895fef0992bd8c2b75d8f038bcd50939e14d5556fe1e14b561843982e76a55437058dafc8eea80388747138e7799_1280.jpg",
        description: "Set in the summer of 1922, the novel follows Nick Carraway, a young Midwestern bond salesman, as he moves to West Egg, Long Island.",
        formats: ["PDF", "EPUB"],
        preview: "A classic tale of love, wealth, and the American Dream..."
    },
    {
        id: 6,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Novels",
        price: 14.99,
        rating: 4.5,
        cover: "https://pixabay.com/get/gfd0fdf1ccff5262a074c5b4f9d3d522a33c573da42fb1f5ae81c635ccb0c7b86dd34f159db783259eb9b3b758d436874c3c702df31dcfc15236bebe721033762_1280.jpg",
        description: "The story of young Scout Finch growing up in Alabama during the 1930s and her father's moral courage in defending a black man falsely accused of rape.",
        formats: ["PDF", "EPUB"],
        preview: "A powerful story of racial injustice and moral growth..."
    },
    {
        id: 7,
        title: "1984",
        author: "George Orwell",
        category: "Novels",
        price: 13.99,
        rating: 4.4,
        cover: "https://pixabay.com/get/g16b9a03274f6c11bff6638cb4f03342a3b2f3ccfa69f9928d9204dde31ef5dc15da2bb5377647f1b9b897ab2f91820a9c1acbce5f57c0df747161f21a9475c08_1280.jpg",
        description: "A dystopian social science fiction novel that follows Winston Smith, a low-ranking member of 'the Party' in London, in the nation of Oceania.",
        formats: ["PDF", "EPUB"],
        preview: "A chilling vision of totalitarian control..."
    },
    {
        id: 8,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Novels",
        price: 11.99,
        rating: 4.3,
        cover: "https://pixabay.com/get/g3ade1e949d921124b24a1690e1c5fea666b2080e0917725def4795d511f6e371a17e1d2ae76aa24017d75f07932f53614fb25a3c86d11a667db5dfadf11b8754_1280.jpg",
        description: "The story follows Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage in the landed gentry society of early 19th-century England.",
        formats: ["PDF", "EPUB"],
        preview: "A timeless romance and social commentary..."
    },

    // Self-Help Books
    {
        id: 9,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        price: 24.99,
        rating: 4.8,
        cover: "https://pixabay.com/get/gc03f8a9cffe366b03ec2fa8d62fa2da44c924326f629346129c8be9ac20aa08afbddb2c33a4a97778e8e2c3b89732f33706e9807f03ea3841189e2a617955f35_1280.jpg",
        description: "Tiny Changes, Remarkable Results. No matter your goals, Atomic Habits offers a proven framework for improving—every day.",
        formats: ["PDF", "EPUB"],
        preview: "Transform your life with the power of atomic habits..."
    },
    {
        id: 10,
        title: "The 7 Habits of Highly Effective People",
        author: "Stephen R. Covey",
        category: "Self-Help",
        price: 22.99,
        rating: 4.6,
        cover: "https://pixabay.com/get/gbddbdbea3a414a66d2b6060ea4c50337d018101597522f8f3a0709591f95ea96fa520ff26288d879309bb1e17823c552908c2e3fa155089c2f34d94790eacfe4_1280.jpg",
        description: "One of the most inspiring and impactful books ever written, The 7 Habits of Highly Effective People has captivated readers for 25 years.",
        formats: ["PDF", "EPUB"],
        preview: "Powerful lessons in personal change and effectiveness..."
    },
    {
        id: 11,
        title: "Think and Grow Rich",
        author: "Napoleon Hill",
        category: "Self-Help",
        price: 18.99,
        rating: 4.4,
        cover: "https://pixabay.com/get/g8ef1283529d86289e69be0d7a193b81b86168b60e058bbd25080f0780b6d06d9bfda58c6ec2ad9da4e9413d979067c288544dbf82980dfe24a69a73c7169098f_1280.jpg",
        description: "Think and Grow Rich has been called the 'Granddaddy of All Motivational Literature.' It was the first book to boldly ask, 'What makes a winner?'",
        formats: ["PDF", "EPUB"],
        preview: "The classic guide to achieving wealth and success..."
    },
    {
        id: 12,
        title: "How to Win Friends and Influence People",
        author: "Dale Carnegie",
        category: "Self-Help",
        price: 21.99,
        rating: 4.5,
        cover: "https://pixabay.com/get/gd5f05fa8d34148359973b2af0f1dcd24f2fcef702d01f5ea238099c4e540f643a15440d09de5c67b658b0bcbd52e6543aeacafc0a200ddc15cf96027cbeeeba0_1280.jpg",
        description: "Dale Carnegie's rock-solid, time-tested advice has carried countless people up the ladder of success in their business and personal lives.",
        formats: ["PDF", "EPUB"],
        preview: "Master the art of human relations and communication..."
    },

    // Science Books
    {
        id: 13,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        price: 19.99,
        rating: 4.7,
        cover: "https://pixabay.com/get/g0713cc5a75eab8bbbbe4519e3de1b115f3f24738e3e3863ea83f2608dee3fda5bcccce4b29bd6db81341f51d301caee6c5a52119fc1bcdbbe24eb3c959d61c6f_1280.jpg",
        description: "A landmark volume in science writing by one of the great minds of our time, Stephen Hawking's book explores such profound questions as: How did the universe begin—and what made its start possible?",
        formats: ["PDF", "EPUB"],
        preview: "Explore the mysteries of the cosmos with Stephen Hawking..."
    },
    {
        id: 14,
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        category: "Science",
        price: 26.99,
        rating: 4.6,
        cover: "https://pixabay.com/get/g46c406faa5a341eb60ca7c72ae18aedaac4f8769a0fa6c575b4991b67bab2f98a6eefaa5f0cf2e5268e5ff47c02ce33995360f4266f8e54349cb8b433d243aa7_1280.jpg",
        description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us.",
        formats: ["PDF", "EPUB"],
        preview: "The fascinating story of human evolution and civilization..."
    },
    {
        id: 15,
        title: "The Origin of Species",
        author: "Charles Darwin",
        category: "Science",
        price: 16.99,
        rating: 4.3,
        cover: "https://pixabay.com/get/g5d3c390c7e6db7c2a95b205d79d55fd3101d699d9b08e06cd0e95ce725c8b8cb9d472b2d03c45888533c8e0a09376b747508f3487eb5ee03058659d77b38ba42_1280.jpg",
        description: "Darwin's theory of natural selection issued a profound challenge to orthodox thought and belief: no being or species has been specifically created; all are locked into a pitiless struggle for existence.",
        formats: ["PDF", "EPUB"],
        preview: "The groundbreaking theory that changed our understanding of life..."
    },
    {
        id: 16,
        title: "Cosmos",
        author: "Carl Sagan",
        category: "Science",
        price: 23.99,
        rating: 4.8,
        cover: "https://pixabay.com/get/g749844f14f0ea89b225f1b8026ddc9e48ffc7e6df530686c39593326d1c40a02b2f98a6eefaa5f0cf2e5268e5ff47c02ce33995360f4266f8e54349cb8b433d243aa7_1280.jpg",
        description: "Cosmos is one of the bestselling science books of all time. In clear-eyed prose, Sagan reveals a jewel-like blue world inhabited by a life form that is just beginning to discover its own identity.",
        formats: ["PDF", "EPUB"],
        preview: "A poetic exploration of the universe and our place in it..."
    },

    // Additional Programming Books
    {
        id: 17,
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        category: "Programming",
        price: 39.99,
        rating: 4.5,
        cover: "https://pixabay.com/get/g12e79e4b74f4a7e4b8b5c8a7b8b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b_1280.jpg",
        description: "This is a series of books diving deep into the core mechanisms of the JavaScript language.",
        formats: ["PDF", "EPUB"],
        preview: "Deep dive into JavaScript fundamentals..."
    },
    {
        id: 18,
        title: "Python Crash Course",
        author: "Eric Matthes",
        category: "Programming",
        price: 34.99,
        rating: 4.6,
        cover: "https://pixabay.com/get/g3f4a8a3a74f4a7e4b8b5c8a7b8b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b3b5b_1280.jpg",
        description: "A hands-on, project-based introduction to programming.",
        formats: ["PDF", "EPUB"],
        preview: "Learn Python through practical projects..."
    },

    // Additional Novels
    {
        id: 19,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        category: "Novels",
        price: 13.99,
        rating: 4.1,
        cover: "https://pixabay.com/get/gfd0fdf1ccff5262a074c5b4f9d3d522a33c573da42fb1f5ae81c635ccb0c7b86dd34f159db783259eb9b3b758d436874c3c702df31dcfc15236bebe721033762_1280.jpg",
        description: "The story of Holden Caulfield, a teenager struggling with adolescence and society.",
        formats: ["PDF", "EPUB"],
        preview: "A coming-of-age story that resonates across generations..."
    },
    {
        id: 20,
        title: "Lord of the Flies",
        author: "William Golding",
        category: "Novels",
        price: 12.99,
        rating: 4.0,
        cover: "https://pixabay.com/get/g16b9a03274f6c11bff6638cb4f03342a3b2f3ccfa69f9928d9204dde31ef5dc15da2bb5377647f1b9b897ab2f91820a9c1acbce5f57c0df747161f21a9475c08_1280.jpg",
        description: "A group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
        formats: ["PDF", "EPUB"],
        preview: "A powerful allegory about human nature and civilization..."
    },

    // Additional Self-Help Books
    {
        id: 21,
        title: "The Power of Now",
        author: "Eckhart Tolle",
        category: "Self-Help",
        price: 19.99,
        rating: 4.4,
        cover: "https://pixabay.com/get/gc03f8a9cffe366b03ec2fa8d62fa2da44c924326f629346129c8be9ac20aa08afbddb2c33a4a97778e8e2c3b89732f33706e9807f03ea3841189e2a617955f35_1280.jpg",
        description: "A guide to spiritual enlightenment through living in the present moment.",
        formats: ["PDF", "EPUB"],
        preview: "Transform your life by embracing the present moment..."
    },
    {
        id: 22,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Self-Help",
        price: 16.99,
        rating: 4.3,
        cover: "https://pixabay.com/get/g8ef1283529d86289e69be0d7a193b81b86168b60e058bbd25080f0780b6d06d9bfda58c6ec2ad9da4e9413d979067c288544dbf82980dfe24a69a73c7169098f_1280.jpg",
        description: "What the rich teach their kids about money that the poor and middle class do not!",
        formats: ["PDF", "EPUB"],
        preview: "Change your financial mindset and build wealth..."
    },

    // Additional Science Books
    {
        id: 23,
        title: "The Double Helix",
        author: "James Watson",
        category: "Science",
        price: 18.99,
        rating: 4.2,
        cover: "https://pixabay.com/get/g5d3c390c7e6db7c2a95b205d79d55fd3101d699d9b08e06cd0e95ce725c8b8cb9d472b2d03c45888533c8e0a09376b747508f3487eb5ee03058659d77b38ba42_1280.jpg",
        description: "A personal account of the discovery of the structure of DNA.",
        formats: ["PDF", "EPUB"],
        preview: "The thrilling story behind one of science's greatest discoveries..."
    },
    {
        id: 24,
        title: "The Elegant Universe",
        author: "Brian Greene",
        category: "Science",
        price: 21.99,
        rating: 4.4,
        cover: "https://pixabay.com/get/g749844f14f0ea89b225f1b8026ddc9e48ffc7e6df530686c39593326d1c40a02b2c6e76153d681b1bd599d620fa7ce8e7c880f777101b6909adaa0ff3237aac8_1280.jpg",
        description: "Superstrings, hidden dimensions, and the quest for the ultimate theory.",
        formats: ["PDF", "EPUB"],
        preview: "Journey into the cutting edge of theoretical physics..."
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    booksData = [...bookDatabase];
    filteredBooks = [...booksData];
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize display
    updateCartCount();
    updateWishlistCount();
    displayBooks();
    updatePagination();
}

function initializeEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Mobile menu
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    
    // Search and filters
    document.getElementById('searchInput').addEventListener('input', debounce(filterBooks, 300));
    document.getElementById('categoryFilter').addEventListener('change', filterBooks);
    document.getElementById('minPrice').addEventListener('input', debounce(filterBooks, 300));
    document.getElementById('maxPrice').addEventListener('input', debounce(filterBooks, 300));
    document.getElementById('sortBy').addEventListener('change', sortBooks);
    
    // View controls
    document.getElementById('gridViewBtn').addEventListener('click', () => setView('grid'));
    document.getElementById('listViewBtn').addEventListener('click', () => setView('list'));
    
    // Pagination
    document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changePage(1));
    
    // Modal controls
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
    
    // Cart modal
    document.getElementById('cartBtn').addEventListener('click', openCartModal);
    document.getElementById('cartModalClose').addEventListener('click', closeCartModal);
    document.getElementById('cartModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeCartModal();
    });
    
    // Wishlist modal
    document.getElementById('wishlistBtn').addEventListener('click', openWishlistModal);
    document.getElementById('wishlistModalClose').addEventListener('click', closeWishlistModal);
    document.getElementById('wishlistModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeWishlistModal();
    });
}

// Theme Management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Filtering and Searching
function filterBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    
    filteredBooks = booksData.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                            book.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || book.category === category;
        const matchesPrice = book.price >= minPrice && book.price <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    currentPage = 1;
    displayBooks();
    updatePagination();
}

function sortBooks() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredBooks.sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);
            case 'author':
                return a.author.localeCompare(b.author);
            case 'price':
                return a.price - b.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });
    
    displayBooks();
}

// View Management
function setView(view) {
    currentView = view;
    
    // Update button states
    document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
    document.getElementById('listViewBtn').classList.toggle('active', view === 'list');
    
    // Update grid class
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.classList.toggle('list-view', view === 'list');
    
    displayBooks();
}

// Book Display
function displayBooks() {
    const booksGrid = document.getElementById('booksGrid');
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = filteredBooks.slice(startIndex, endIndex);
    
    if (booksToShow.length === 0) {
        booksGrid.innerHTML = `
            <div class="no-books">
                <i class="fas fa-book-open" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>No books found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }
    
    booksGrid.innerHTML = booksToShow.map(book => createBookCard(book)).join('');
}

function createBookCard(book) {
    const isInWishlist = wishlist.some(item => item.id === book.id);
    const isInCart = cart.some(item => item.id === book.id);
    
    return `
        <div class="book-card ${currentView === 'list' ? 'list-view' : ''}">
            <img src="${book.cover}" alt="${book.title}" class="book-cover" loading="lazy">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <span class="book-category">${book.category}</span>
                <div class="book-rating">
                    <span class="stars">${generateStars(book.rating)}</span>
                    <span class="rating-text">(${book.rating})</span>
                </div>
                <div class="book-price">$${book.price.toFixed(2)}</div>
                <div class="book-actions">
                    <button class="btn btn-primary" onclick="viewBookDetails(${book.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-secondary ${isInCart ? 'disabled' : ''}" 
                            onclick="addToCart(${book.id})" 
                            ${isInCart ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> 
                        ${isInCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                    <button class="btn btn-wishlist ${isInWishlist ? 'active' : ''}" 
                            onclick="toggleWishlist(${book.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');
    
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        displayBooks();
        updatePagination();
        
        // Smooth scroll to books section
        document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
    }
}

// Book Details Modal
function viewBookDetails(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    const modalBody = document.querySelector('#modalOverlay .modal-body');
    const isInWishlist = wishlist.some(item => item.id === book.id);
    const isInCart = cart.some(item => item.id === book.id);
    
    modalBody.innerHTML = `
        <div class="book-detail">
            <img src="${book.cover}" alt="${book.title}" class="book-detail-cover">
            <div class="book-detail-info">
                <h2>${book.title}</h2>
                <p class="book-author">by ${book.author}</p>
                <span class="book-category">${book.category}</span>
                <div class="book-rating">
                    <span class="stars">${generateStars(book.rating)}</span>
                    <span class="rating-text">(${book.rating})</span>
                </div>
                <div class="book-price">$${book.price.toFixed(2)}</div>
                <div class="book-description">
                    <h4>Description</h4>
                    <p>${book.description}</p>
                </div>
                <div class="book-description">
                    <h4>Preview</h4>
                    <p>${book.preview}</p>
                </div>
                <div class="book-actions">
                    <button class="btn btn-secondary ${isInCart ? 'disabled' : ''}" 
                            onclick="addToCart(${book.id}); updateModalButtons(${book.id})" 
                            ${isInCart ? 'disabled' : ''}
                            id="modal-cart-btn-${book.id}">
                        <i class="fas fa-shopping-cart"></i> 
                        ${isInCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                    <button class="btn btn-wishlist ${isInWishlist ? 'active' : ''}" 
                            onclick="toggleWishlist(${book.id}); updateModalButtons(${book.id})"
                            id="modal-wishlist-btn-${book.id}">
                        <i class="fas fa-heart"></i> 
                        ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>
                <div class="download-options">
                    ${book.formats.map(format => 
                        `<button class="btn btn-download" onclick="downloadBook(${book.id}, '${format}')">
                            <i class="fas fa-download"></i> Download ${format}
                        </button>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateModalButtons(bookId) {
    const isInWishlist = wishlist.some(item => item.id === bookId);
    const isInCart = cart.some(item => item.id === bookId);
    
    const cartBtn = document.getElementById(`modal-cart-btn-${bookId}`);
    const wishlistBtn = document.getElementById(`modal-wishlist-btn-${bookId}`);
    
    if (cartBtn) {
        cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> ${isInCart ? 'In Cart' : 'Add to Cart'}`;
        cartBtn.disabled = isInCart;
        cartBtn.classList.toggle('disabled', isInCart);
    }
    
    if (wishlistBtn) {
        wishlistBtn.innerHTML = `<i class="fas fa-heart"></i> ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}`;
        wishlistBtn.classList.toggle('active', isInWishlist);
    }
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function downloadBook(bookId, format) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    // Show download notification
    showNotification(`Starting download of "${book.title}" in ${format} format...`, 'success');
    
    // Create a simulated file download
    setTimeout(() => {
        const element = document.createElement('a');
        const fileContent = `This is a sample ${format} file for "${book.title}" by ${book.author}.\n\n${book.description}\n\nThank you for purchasing from BookStore!`;
        const file = new Blob([fileContent], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.${format.toLowerCase()}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        showNotification(`Download completed: "${book.title}"`, 'success');
    }, 1000);
}

// Cart Management
function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book || cart.some(item => item.id === bookId)) return;
    
    cart.push({ ...book, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayBooks(); // Refresh to update button states
    
    // Show success message
    showNotification(`"${book.title}" added to cart!`, 'success');
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    displayBooks(); // Refresh to update button states
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function openCartModal() {
    displayCartItems();
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>Your cart is empty</h3>
                <p>Add some books to get started!</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartItems.innerHTML = `
        ${cart.map(item => `
            <div class="cart-item">
                <img src="${item.cover}" alt="${item.title}" class="item-cover">
                <div class="item-info">
                    <h4>${item.title}</h4>
                    <p>by ${item.author}</p>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('')}
        ${cart.length > 0 ? `
            <div class="cart-actions">
                <button class="btn btn-primary checkout-btn" onclick="proceedToCheckout()">
                    <i class="fas fa-credit-card"></i> Proceed to Checkout
                </button>
            </div>
        ` : ''}
    `;
    
    cartTotal.textContent = total.toFixed(2);
}

// Wishlist Management
function toggleWishlist(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    const existingIndex = wishlist.findIndex(item => item.id === bookId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showNotification(`"${book.title}" removed from wishlist!`, 'info');
    } else {
        wishlist.push(book);
        showNotification(`"${book.title}" added to wishlist!`, 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    displayBooks(); // Refresh to update button states
}

function removeFromWishlist(bookId) {
    wishlist = wishlist.filter(item => item.id !== bookId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    displayWishlistItems();
    displayBooks(); // Refresh to update button states
}

function updateWishlistCount() {
    document.getElementById('wishlistCount').textContent = wishlist.length;
}

function openWishlistModal() {
    displayWishlistItems();
    document.getElementById('wishlistModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWishlistModal() {
    document.getElementById('wishlistModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function displayWishlistItems() {
    const wishlistItems = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save books you're interested in for later!</p>
            </div>
        `;
        return;
    }
    
    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.cover}" alt="${item.title}" class="item-cover">
            <div class="item-info">
                <h4>${item.title}</h4>
                <p>by ${item.author}</p>
                <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-primary" onclick="addToCart(${item.id}); displayWishlistItems();">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="item-remove" onclick="removeFromWishlist(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--accent-color)' : 'var(--primary-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-heavy)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.section-title, .book-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Checkout Functionality
function proceedToCheckout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Create checkout modal
    const checkoutModal = createCheckoutModal(total);
    document.body.appendChild(checkoutModal);
    
    // Close cart modal and open checkout modal
    closeCartModal();
    setTimeout(() => {
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 300);
}

function createCheckoutModal(total) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay checkout-modal';
    modal.id = 'checkoutModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeCheckoutModal()">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <h2><i class="fas fa-credit-card"></i> Checkout</h2>
                <div class="checkout-summary">
                    <h3>Order Summary</h3>
                    <div class="order-items">
                        ${cart.map(item => `
                            <div class="order-item">
                                <img src="${item.cover}" alt="${item.title}" class="item-cover">
                                <div class="item-details">
                                    <h4>${item.title}</h4>
                                    <p>by ${item.author}</p>
                                    <span class="item-price">$${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <strong>Total: $${total.toFixed(2)}</strong>
                    </div>
                </div>
                
                <form class="checkout-form" id="checkoutForm">
                    <h3>Customer Information</h3>
                    <div class="form-group">
                        <label for="customerName">Full Name *</label>
                        <input type="text" id="customerName" required>
                    </div>
                    <div class="form-group">
                        <label for="customerEmail">Email Address *</label>
                        <input type="email" id="customerEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="customerPhone">Phone Number</label>
                        <input type="tel" id="customerPhone">
                    </div>
                    
                    <h3>Payment Information</h3>
                    <div class="form-group">
                        <label for="cardNumber">Card Number *</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Expiry Date *</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV *</label>
                            <input type="text" id="cvv" placeholder="123" required>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary place-order-btn">
                        <i class="fas fa-lock"></i> Place Order - $${total.toFixed(2)}
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Add form submission handler
    modal.querySelector('#checkoutForm').addEventListener('submit', handleOrderSubmission);
    
    // Add click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeCheckoutModal();
    });
    
    return modal;
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}

function handleOrderSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Simulate order processing
    showNotification('Processing your order...', 'info');
    
    setTimeout(() => {
        // Generate order ID
        const orderId = 'BK' + Date.now().toString().slice(-6);
        
        // Show success modal
        showOrderSuccessModal(orderId, customerName, total);
        
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Close checkout modal
        closeCheckoutModal();
    }, 2000);
}

function showOrderSuccessModal(orderId, customerName, total) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay success-modal';
    modal.id = 'successModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-body text-center">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Order Placed Successfully!</h2>
                <p class="success-message">Thank you, ${customerName}! Your order has been confirmed.</p>
                
                <div class="order-details">
                    <div class="detail-item">
                        <span class="label">Order ID:</span>
                        <span class="value">#${orderId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Total Amount:</span>
                        <span class="value">$${total.toFixed(2)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Status:</span>
                        <span class="value status-confirmed">Confirmed</span>
                    </div>
                </div>
                
                <p class="download-info">
                    <i class="fas fa-download"></i>
                    Your books are now available for download. Check your email for download links!
                </p>
                
                <button class="btn btn-primary" onclick="closeSuccessModal()">
                    <i class="fas fa-home"></i> Continue Shopping
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 10000);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}

// Service Worker for offline functionality (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Category filtering functions
function filterByCategory(category) {
    // Set the category filter
    document.getElementById('categoryFilter').value = category;
    
    // Trigger filtering
    filterBooks();
    
    // Scroll to books section
    document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
    
    // Show notification
    showNotification(`Showing ${category} books`, 'info');
}

// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }
});

function handleContactFormSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Show processing message
    showNotification('Sending your message...', 'info');
    
    // Simulate sending (in real app, this would send to server)
    setTimeout(() => {
        showNotification(`Thank you ${name}! Your message has been sent successfully.`, 'success');
        
        // Reset form
        e.target.reset();
    }, 1500);
}
