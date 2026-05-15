'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { translations } from '../../lib/translations';

export default function GPTListePage() {
  const [language, setLanguage] = useState('de');
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  const t = translations[language];

  useEffect(() => {
    async function loadModels() {
      const { data, error } = await supabase
        .from('gptlist')
        .select('model, description')
        .order('model');

      if (error) {
        setError(error.message);
      } else {
        setModels(data || []);
      }
    }

    loadModels();
  }, []);

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

        {error && (
          <div
            style={{
              background: '#ffe5e5',
              color: '#b00020',
              padding: '16px',
              borderRadius: '10px',
              marginTop: '20px'
            }}
          >
            {t.error} {error}
          </div>
        )}

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '30px',
            background: '#fff',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          <thead>
            <tr style={{ background: '#f4f4f4' }}>
              <th style={{ textAlign: 'left', padding: '16px' }}>
                {t.model}
              </th>
              <th style={{ textAlign: 'left', padding: '16px' }}>
                {t.description}
              </th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.model}>
                <td
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #eee',
                    fontWeight: 'bold'
                  }}
                >
                  {model.model}
                </td>
                <td
                  style={{
                    padding: '16px',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  {model.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
