'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { translations } from '../lib/translations';

export default function Home() {
  const [language, setLanguage] = useState('de');
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');

  const t = translations[language];

  useEffect(() => {
    const savedUser = localStorage.getItem('google_user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const handleGoogleResponse = (response) => {
    try {
      const token = response.credential;
      const payload = JSON.parse(atob(token.split('.')[1]));

      const userData = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      };

      localStorage.setItem('google_user', JSON.stringify(userData));
      setUser(userData);
      setAuthError('');
    } catch (error) {
      console.error(error);
      setAuthError('Google Login fehlgeschlagen');
    }
  };

  const signInWithGoogle = () => {
    if (!window.google) {
      setAuthError('Google Identity Services wurde nicht geladen');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse
    });

    window.google.accounts.id.prompt();
  };

  const logout = () => {
    localStorage.removeItem('google_user');
    setUser(null);
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
      />

      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          fontFamily: 'Arial, sans-serif',
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/pole-dance-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            display: 'flex',
            gap: '12px',
            zIndex: 10
          }}
        >
          {!user ? (
            <button
              onClick={signInWithGoogle}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                background: '#ffffff',
                color: '#111',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {t.login}
            </button>
          ) : (
            <button
              onClick={logout}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                background: '#ffffff',
                color: '#111',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          )}

          <button
            onClick={toggleLanguage}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: 'none',
              background: '#111',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {t.switchLanguage}
          </button>
        </div>

        <aside
          style={{
            width: '260px',
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            padding: '30px 20px',
            backdropFilter: 'blur(6px)'
          }}
        >
          <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>
            mygptlist
          </h2>

          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {user ? (
              <Link
                href="/gptliste"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.12)',
                  fontWeight: 'bold'
                }}
              >
                {t.gptList}
              </Link>
            ) : (
              <div
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  fontWeight: 'bold',
                  cursor: 'not-allowed'
                }}
              >
                {t.gptList}
              </div>
            )}
          </nav>
        </aside>

        <section
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            padding: '40px'
          }}
        >
          <div style={{ maxWidth: '700px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '56px', marginBottom: '20px' }}>
              {t.title}
            </h1>

            <p style={{ fontSize: '20px', lineHeight: '1.6' }}>
              {t.subtitle}
            </p>

            {user && (
              <div
                style={{
                  marginTop: '25px',
                  background: 'rgba(255,255,255,0.12)',
                  padding: '18px',
                  borderRadius: '12px'
                }}
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%'
                  }}
                />

                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            )}

            {authError && (
              <div
                style={{
                  marginTop: '20px',
                  background: 'rgba(255,0,0,0.2)',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                {authError}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
