import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/header.scss';

interface HeaderProps {
  logoTheme?: string;
}

const Header: React.FC<HeaderProps> = ({ logoTheme = 'theme-dark' }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menuAreaRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  // Handle outside click to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuAreaRef.current &&
        menuBtnRef.current &&
        menuToggleRef.current &&
        !menuBtnRef.current.contains(event.target as Node) &&
        !menuToggleRef.current.contains(event.target as Node)
      ) {
        setIsMenuActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="header-area">
      <div className="header-content">
        <div className="header-section header-left">
          <div className={`logo-area ${logoTheme}`}>
            <div className="img-bg" style={{backgroundImage: 'url(images/logo.png)'}}></div>
          </div>
        </div>
        <div 
          className={`app-menu-area ${isMenuActive ? 'active' : ''}`}
          ref={menuAreaRef}
        >
          <button 
            className="app-menu-btn fixed" 
            aria-label="Toggle Menu"
            ref={menuBtnRef}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="app-menu-togger" ref={menuToggleRef}>
            <ul className="app-menu-navs">
              <li className="app-menu-nav" style={{transitionDelay: '250ms'}}>
                <Link className="typography-h5" to="/home">Home</Link>
              </li>
              <li className="app-menu-nav" style={{transitionDelay: '350ms'}}>
                <Link className="typography-h5" to="/photography">Photography</Link>
              </li>
              <li className="app-menu-nav" style={{transitionDelay: '400ms'}}>
                <Link className="typography-h5" to="/makeup-and-hair">Makeup & Hair</Link>
              </li>
              <li className="app-menu-nav" style={{transitionDelay: '450ms'}}>
                <Link className="typography-h5" to="/portfolio">Portfolio</Link>
              </li>
              <li className="app-menu-nav" style={{transitionDelay: '500ms'}}>
                <Link className="typography-h5" to="/contact-us">Contacts Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;