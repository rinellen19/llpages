class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .footer {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 24px 24px 0 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          margin-top: 5rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .footer-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--primary-color, #FF5D8F);
        }
        
        .footer-text {
          color: #6b7280;
        }
        
        .quick-links-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--accent3-color, #AE8FEF);
        }
        
        .links-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .footer-link {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.3s;
          display: flex;
          align-items: center;
        }
        
        .footer-link:hover {
          color: var(--primary-color, #FF5D8F);
        }
        
        .footer-link i {
          font-size: 0.75rem;
          margin-right: 0.5rem;
        }
        
        .social-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--accent2-color, #54D4B2);
        }
        
        .social-icons {
          display: flex;
          gap: 1rem;
        }
        
        .social-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          background-color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-color, #FF5D8F);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .social-icon.youtube:hover {
          background-color: var(--primary-color, #FF5D8F);
          color: white;
        }
        
        .social-icon.twitter {
          color: var(--secondary-color, #5CB5FF);
        }
        
        .social-icon.twitter:hover {
          background-color: var(--secondary-color, #5CB5FF);
          color: white;
        }
        
        .social-icon.instagram {
          color: var(--accent1-color, #FFD871);
        }
        
        .social-icon.instagram:hover {
          background-color: var(--accent1-color, #FFD871);
          color: white;
        }
        
        .footer-bottom {
          border-top: 1px solid #e5e7eb;
          margin-top: 2rem;
          padding-top: 2rem;
          text-align: center;
          color: #6b7280;
        }
        
        @media (prefers-color-scheme: dark) {
          .footer {
            background: rgba(40, 40, 50, 0.8);
          }
          
          .footer-text, .footer-link {
            color: #9ca3af;
          }
          
          .social-icon {
            background-color: #374151;
          }
          
          .footer-bottom {
            border-top-color: #374151;
          }
        }
        
        :host-context(.dark) .footer {
          background: rgba(40, 40, 50, 0.8);
        }
        
        :host-context(.dark) .footer-text,
        :host-context(.dark) .footer-link {
          color: #9ca3af;
        }
        
        :host-context(.dark) .social-icon {
          background-color: #374151;
        }
        
        :host-context(.dark) .footer-bottom {
          border-top-color: #374151;
        }
      </style>
      
      <footer class="footer">
        <div class="footer-grid">
          <div>
            <h3 class="footer-title">LIELLA! Music</h3>
            <p class="footer-text">
              Una colección dedicada a la música oficial de LIELLA!
            </p>
          </div>
          
          <div>
            <h3 class="quick-links-title">Enlaces Rápidos</h3>
            <ul class="links-list">
              <li>
                <a href="#" class="footer-link">
                  <i class="fas fa-chevron-right"></i> Inicio
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  <i class="fas fa-chevron-right"></i> Colecciones
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  <i class="fas fa-chevron-right"></i> Álbumes
                </a>
              </li>
              <li>
                <a href="#" class="footer-link">
                  <i class="fas fa-chevron-right"></i> Contacto
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="social-title">Síguenos</h3>
            <div class="social-icons">
              <a href="#" class="social-icon youtube">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="#" class="social-icon twitter">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon instagram">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2023 LIELLA! Music Collection. Todos los derechos reservados.</p>
        </div>
      </footer>
    `;
  }
  
  // Method to update theme variables
  updateTheme(theme) {
    const root = this.shadowRoot;
    root.host.classList.toggle('dark', theme === 'dark');
  }
}

customElements.define('footer-component', FooterComponent);