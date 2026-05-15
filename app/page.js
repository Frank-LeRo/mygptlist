'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { translations } from '../lib/translations';

export default function Home() {
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
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/public/pole-dance-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff'
          }}
        >
          <div>
            <h1 style={{ fontSize: '42px', marginBottom: '8px' }}>
              {t.title}
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
              cursor: 'pointer',
              height: 'fit-content'
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
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(4px)',
            borderRadius: '14px',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)'
          }}
        >
          <thead>
            <tr style={{ background: '#f4f4f4' }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: '16px',
                  borderBottom: '1px solid #ddd'
                }}
              >
                {t.model}
              </th>
              <th
                style={{
                  textAlign: 'left',
                  padding: '16px',
                  borderBottom: '1px solid #ddd'
                }}
              >
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
      </div>
    </main>
  );
}
