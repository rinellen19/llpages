class MenuComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.render();
    this.setupEventListeners();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Menu and Navigation */
        .menu-toggle {
          position: fixed;
          top: 6px;
          right: 6px;
          z-index: 50;
          width: 3rem;
          height: 3rem;
          background-color: var(--primary-color, #FF5D8F);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          color: white;
          border: none;
          cursor: pointer;
        }
        
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        .main-menu {
          position: fixed;
          top: 0;
          right: -300px;
          width: 300px;
          height: 100%;
          z-index: 101;
          background-color: white;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }
        
        .main-menu.active {
          right: 0;
        }
        
        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
        }
        
        .menu-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--primary-color, #FF5D8F);
        }
        
        .menu-title span {
          color: var(--secondary-color, #5CB5FF);
        }
        
        .close-menu {
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .close-menu:hover {
          color: var(--primary-color, #FF5D8F);
        }
        
        .profile-section {
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .profile-image {
          width: 8rem;
          height: 8rem;
          border-radius: 9999px;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 4px solid var(--accent1-color, #FFD871);
        }
        
        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .menu-nav {
          flex: 1;
        }
        
        .menu-link {
          display: block;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        
        .menu-link i {
          width: 1.5rem;
        }
        
        .home-link {
          color: var(--primary-color, #FF5D8F);
        }
        
        .home-link:hover {
          background-color: rgba(255, 93, 143, 0.1);
        }
        
        .collections-link {
          color: var(--secondary-color, #5CB5FF);
        }
        
        .collections-link:hover {
          background-color: rgba(92, 181, 255, 0.1);
        }
        
        .releases-link {
          color: var(--accent3-color, #AE8FEF);
        }
        
        .releases-link:hover {
          background-color: rgba(174, 143, 239, 0.1);
        }
        
        .albums-link {
          color: var(--accent2-color, #54D4B2);
        }
        
        .albums-link:hover {
          background-color: rgba(84, 212, 178, 0.1);
        }
        
        .support-link {
          color: var(--accent1-color, #FFD871);
        }
        
        .support-link:hover {
          background-color: rgba(255, 216, 113, 0.1);
        }
        
        .menu-footer {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
        }
        
        .social-link {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        .social-link:hover.youtube {
          color: var(--primary-color, #FF5D8F);
        }
        
        .social-link:hover.twitter {
          color: var(--secondary-color, #5CB5FF);
        }
        
        .social-link:hover.instagram {
          color: var(--accent1-color, #FFD871);
        }
        
        @media (prefers-color-scheme: dark) {
          .main-menu {
            background-color: #1D1E25;
          }
          
          .close-menu {
            color: #9ca3af;
          }
          
          .menu-footer {
            border-top-color: #374151;
          }
        }
        
        :host-context(.dark) .main-menu {
          background-color: #1D1E25;
        }
        
        :host-context(.dark) .close-menu {
          color: #9ca3af;
        }
        
        :host-context(.dark) .menu-footer {
          border-top-color: #374151;
        }
      </style>
      
      <button class="menu-toggle" id="menuToggle">
        <i class="fas fa-bars" style="font-size: 1.25rem;"></i>
      </button>
      
      <div class="menu-overlay" id="menuOverlay"></div>
      
      <div class="main-menu" id="mainMenu">
        <div class="menu-header">
          <h2 class="menu-title">LIELLA!<span>Music</span></h2>
          <button class="close-menu" id="closeMenu">
            <i class="fas fa-times" style="font-size: 1.25rem;"></i>
          </button>
        </div>
        
        <div class="profile-section">
          <div class="profile-image">
            <img src="https://i.imgur.com/gKP40xz.jpeg" alt="Album Profile">
          </div>
          <p style="color: #6b7280;">Colección de Música Oficial</p>
        </div>
        
        <nav class="menu-nav">
          <a href="#" class="menu-link home-link">
            <i class="fas fa-home"></i>
            <span>Inicio</span>
          </a>
          <a href="#" class="menu-link collections-link">
            <i class="fas fa-music"></i>
            <span>Colecciones</span>
          </a>
          <a href="#" class="menu-link releases-link">
            <i class="fas fa-calendar-alt"></i>
            <span>Lanzamientos</span>
          </a>
          <a href="#" class="menu-link albums-link">
            <i class="fas fa-compact-disc"></i>
            <span>Álbumes</span>
          </a>
          <a href="#" class="menu-link support-link">
            <i class="fas fa-heart"></i>
            <span>Apóyanos</span>
          </a>
        </nav>
        
        <div class="menu-footer">
          <div class="social-links">
            <a href="#" class="social-link youtube">
              <i class="fab fa-youtube" style="font-size: 1.25rem;"></i>
            </a>
            <a href="#" class="social-link twitter">
              <i class="fab fa-twitter" style="font-size: 1.25rem;"></i>
            </a>
            <a href="#" class="social-link instagram">
              <i class="fab fa-instagram" style="font-size: 1.25rem;"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }
  
  setupEventListeners() {
    const menuToggle = this.shadowRoot.getElementById('menuToggle');
    const closeMenu = this.shadowRoot.getElementById('closeMenu');
    const mainMenu = this.shadowRoot.getElementById('mainMenu');
    const menuOverlay = this.shadowRoot.getElementById('menuOverlay');
    
    const openMenu = () => {
      mainMenu.classList.add('active');
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    };
    
    const closeMenuFunc = () => {
      mainMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    };
    
    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    menuOverlay.addEventListener('click', closeMenuFunc);
  }
  
  // Method to update theme variables
  updateTheme(theme) {
    const root = this.shadowRoot;
    root.host.classList.toggle('dark', theme === 'dark');
  }
}

customElements.define('menu-component', MenuComponent);