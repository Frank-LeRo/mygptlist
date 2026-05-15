'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../lib/translations';

export default function Home() {
  const [language, setLanguage] = useState('de');
  const [authError, setAuthError] = useState('');

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  const signInWithGoogle = async () => {
    setAuthError('');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });

    if (error) {
      console.error(error);

      if (error.message.includes('provider is not enabled')) {
        setAuthError(
          'Google Login ist in Supabase noch nicht aktiviert.'
        );
      } else {
        setAuthError(error.message);
      }
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/pole-dance-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
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

          <div
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '30px',
              flexWrap: 'wrap'
            }}
          >
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
          </div>

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
  );
}
