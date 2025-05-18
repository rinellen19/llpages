document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Spotlight effect
    const spotlightContainer = document.getElementById('spotlight');
    const spotlightCount = 3;
    
    for (let i = 0; i < spotlightCount; i++) {
        const spotlight = document.createElement('div');
        spotlight.className = 'spotlight';
        
        const size = Math.random() * 300 + 300;
        spotlight.style.width = size + 'px';
        spotlight.style.height = size + 'px';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        spotlight.style.left = x + 'vw';
        spotlight.style.top = y + 'vh';
        
        spotlightContainer.appendChild(spotlight);
        
        // Animate spotlights
        animateSpotlight(spotlight);
    }
    
    function animateSpotlight(spotlight) {
        const newX = Math.random() * 100;
        const newY = Math.random() * 100;
        const duration = Math.random() * 5000 + 5000;
        
        spotlight.style.transition = `left ${duration}ms ease, top ${duration}ms ease`;
        spotlight.style.left = newX + 'vw';
        spotlight.style.top = newY + 'vh';
        
        setTimeout(() => {
            animateSpotlight(spotlight);
        }, duration);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
    });
    
    // Detect system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
        if (event.matches) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
        }
    });
    
    // Navigation interaction
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(el => {
                el.classList.remove('active');
            });
            this.classList.add('active');
            
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Album card interactions
    document.querySelectorAll('.album-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isListen = this.textContent.trim() === 'Escuchar' || this.textContent.trim() === 'Ver';
            
            if (isListen) {
                // Simulate play action
                const card = this.closest('.album-card');
                const title = card.querySelector('.album-title').textContent;
                console.log(`Playing: ${title}`);
            }
        });
    });
    
    // Search modal functionality
    const searchButton = document.getElementById('search-button');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Variable para almacenar el contenido de búsqueda
    let searchableContent = [];
    
    // Función para cargar los datos desde un archivo JSON
    async function loadSearchData() {
        try {
            // Mostrar estado de carga
            searchResults.innerHTML = `
                <div class="loading">
                    <div class="loader"></div>
                </div>
            `;
            
            // URL del archivo JSON
            const jsonUrl = 'https://cdn.jsdelivr.net/gh/rinellen19/llpages@main/search7.json';
            
            // Fetch data from the JSON file
            const response = await fetch(jsonUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Parse the JSON response
            const data = await response.json();
            searchableContent = data;
            
            // Restaurar el mensaje por defecto después de cargar
            searchResults.innerHTML = '<div class="results-info">Empieza a escribir para buscar en toda la web...</div>';
            
            console.log(`Datos de búsqueda cargados: ${searchableContent.length} elementos`);
        } catch (error) {
            console.error('Error al cargar los datos de búsqueda:', error);
            // En caso de error, usamos datos de respaldo
            searchableContent = [];
            // Mostrar mensaje al usuario
            searchResults.innerHTML = '<div class="no-results">Error al cargar los datos de búsqueda. Por favor, intenta más tarde.</div>';
        }
    }
    
    // Cargar los datos al iniciar
    loadSearchData();
    
    // Open search modal
    searchButton.addEventListener('click', function() {
        searchModal.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
    
    // Close search modal
    searchClose.addEventListener('click', function() {
        searchModal.classList.remove('active');
    });
    
    // Also close on outside click
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
    
    // Prevent closing when clicking inside the search container
    document.querySelector('.search-container').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '<div class="results-info">Empieza a escribir para buscar en toda la web...</div>';
            return;
        }
        
        // Verificar si los datos están cargados
        if (searchableContent.length === 0) {
            searchResults.innerHTML = '<div class="no-results">Cargando datos de búsqueda...</div>';
            return;
        }
        
        // Filter content based on search query
        const filteredResults = searchableContent.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const descriptionMatch = item.description.toLowerCase().includes(query);
            const categoryMatch = item.category.toLowerCase().includes(query);
            const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(query));
            
            return titleMatch || descriptionMatch || categoryMatch || tagsMatch;
        });
        
        if (filteredResults.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No se encontraron resultados para tu búsqueda.</div>';
            return;
        }
        
        // Render results
        const resultsHTML = filteredResults.map(result => {
            // Highlight matching text
            let title = result.title;
            let description = result.description;
            
            if (title.toLowerCase().includes(query)) {
                const regex = new RegExp(`(${query})`, 'gi');
                title = title.replace(regex, '<span class="highlight">$1</span>');
            }
            
            if (description.toLowerCase().includes(query)) {
                const regex = new RegExp(`(${query})`, 'gi');
                description = description.replace(regex, '<span class="highlight">$1</span>');
            }
            
            return `
                <div class="result-item" data-url="${result.url}">
                    <div class="result-category">${result.category}</div>
                    <h3 class="result-title">${title}</h3>
                    <p class="result-excerpt">${description}</p>
                    <div class="result-url">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                        </svg>
                        ${result.url}
                    </div>
                </div>
            `;
        }).join('');
        
        searchResults.innerHTML = `
            <div class="results-info">Se encontraron ${filteredResults.length} resultados para "${query}"</div>
            ${resultsHTML}
        `;
        
        // Add click events to results
        document.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                window.location.href = url;
            });
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });
});