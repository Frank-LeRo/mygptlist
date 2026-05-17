'use client';

import { useState } from 'react';
import Link from 'next/link';
import { translations } from '../../lib/translations';

export default function GPTListePage() {
  const [language, setLanguage] = useState('de');

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        background: '#f5f5f5'
      }}
    >
      <aside
        style={{
          width: '260px',
          background: '#111',
          color: '#fff',
          padding: '30px 20px'
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

          <Link
            href="/sportkurse"
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '14px 18px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)'
            }}
          >
            {t.sportCourses}
          </Link>
        </nav>
      </aside>

      <section
        style={{
          flex: 1,
          padding: '40px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h1 style={{ fontSize: '42px', marginBottom: '8px' }}>
              {t.gptList}
            </h1>
            <p>{t.subtitle}</p>
          </div>

          <button
            onClick={toggleLanguage}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: '#111',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {t.switchLanguage}
          </button>
        </div>

        <div
          style={{
            marginTop: '30px',
            background: '#fff',
            padding: '24px',
            borderRadius: '14px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          <p>
            Der Zugriff auf die Tabelle gptlist wurde aus dem Repository entfernt.
          </p>
        </div>
      </section>
    </main>
  );
}
