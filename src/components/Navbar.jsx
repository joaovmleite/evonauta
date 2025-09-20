import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function StanfordNavbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="stanford-navbar" style={{ backgroundColor: '#b1040e' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      <div
        className="stanford-navbar__container"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffff',
          padding: '0 1rem',
          height: 64,
        }}
      >
        <div className="stanford-navbar__brand" style={{ display: 'flex', alignItems: 'center' }}>
          <span
            className="stanford-navbar__logo"
            style={{ fontSize: '2.1rem', fontWeight: 600 }}
          >
            Evolucional University
          </span>
        </div>
        {/* Desktop nav */}
        <nav
          className="stanford-navbar__nav uk-visible@m"
          style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1.2rem' }}
        >
          <Link style={{ color: '#ffffff', textDecoration: 'none', fontFamily: 'Source Sans 3' }} to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Link>
          <Link style={{ color: '#ffffff', textDecoration: 'none', fontFamily: 'Source Sans 3' }} to="/students" className={location.pathname === '/students' ? 'active' : ''}>Alunos</Link>
          <Link style={{ color: '#ffffff', textDecoration: 'none', fontFamily: 'Source Sans 3' }} to="/teachers" className={location.pathname === '/teachers' ? 'active' : ''}>Professores</Link>
        </nav>
        {/* Mobile menu button */}
        <button
          className="stanford-navbar__menu-btn uk-hidden@m"
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer' }}
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      {/* Mobile nav sidebar (direita) */}
      {mobileOpen && (
        <>
          <div
            className="stanford-navbar__mobile-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.7)',
              zIndex: 9999,
            }}
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="stanford-navbar__mobile-sidebar"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '80vw',
              maxWidth: 340,
              background: '#b1040e',
              boxShadow: '-2px 0 16px rgba(0,0,0,0.15)',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '1.5rem 1.2rem 1.2rem 1.2rem',
              borderRadius: '16px 0 0 0',
              animation: 'slideInRight 0.25s',
            }}
          >
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 28,
                position: 'absolute',
                top: 12,
                right: 18,
                cursor: 'pointer',
              }}
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
            >
              <i className="fas fa-times"></i>
            </button>
            <Link
              style={{ color: '#fff', textDecoration: 'none', fontFamily: 'Source Sans 3', fontSize: '1.3rem', margin: '2.5rem 0 0.7rem 0' }}
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              style={{ color: '#fff', textDecoration: 'none', fontFamily: 'Source Sans 3', fontSize: '1.3rem', margin: '0.7rem 0' }}
              to="/students"
              className={location.pathname === '/students' ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              Alunos
            </Link>
            <Link
              style={{ color: '#fff', textDecoration: 'none', fontFamily: 'Source Sans 3', fontSize: '1.3rem', margin: '0.7rem 0' }}
              to="/teachers"
              className={location.pathname === '/teachers' ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              Professores
            </Link>
          </aside>
          {/* Animação CSS inline para slideInRight */}
          <style>{`
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}
    </header>
  );
}
