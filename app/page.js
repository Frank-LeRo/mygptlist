'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { translations } from '../lib/translations';

export default function Home() {
  const [language, setLanguage] = useState('de');
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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

  const logAuthSession = async ({
    loginTimestamp,
    logoutTimestamp,
    userData,
    sessionId
  }) => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase Umgebungsvariablen fehlen');
        return;
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/auth_session_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          login_timestamp: loginTimestamp,
          logout_timestamp: logoutTimestamp,
          user_name: userData?.name || null,
          user_mail: userData?.email || null,
          user_id: userData?.email || null,
          session_id: sessionId,
          url: window.location.href
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Supabase Auth-Log Fehler:', errorText);
      }
    } catch (error) {
      console.error('Fehler beim Schreiben des Auth-Logs', error);
    }
  };

  const signInWithGoogle = () => {
    setAuthError('');

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      setAuthError('NEXT_PUBLIC_GOOGLE_CLIENT_ID ist nicht gesetzt');
      return;
    }

    if (!window.google?.accounts?.oauth2) {
      setAuthError('Google Identity Services wurde nicht geladen');
      return;
    }

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid email profile',
        callback: async (tokenResponse) => {
          try {
            if (!tokenResponse?.access_token) {
              setAuthError('Google Anmeldung fehlgeschlagen');
              return;
            }

            const response = await fetch(
              'https://www.googleapis.com/oauth2/v3/userinfo',
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`
                }
              }
            );

            const profile = await response.json();
            const sessionId = crypto.randomUUID();

            const userData = {
              name: profile.name,
              email: profile.email,
              picture: profile.picture,
              sessionId
            };

            localStorage.setItem('google_user', JSON.stringify(userData));
            setUser(userData);

            await logAuthSession({
              loginTimestamp: new Date().toISOString(),
              logoutTimestamp: null,
              userData,
              sessionId
            });

            setAuthError('');
          } catch (error) {
            console.error(error);
            setAuthError('Benutzerdaten konnten nicht geladen werden');
          }
        }
      });

      client.requestAccessToken();
    } catch (error) {
      console.error(error);
      setAuthError('Google Login konnte nicht gestartet werden');
    }
  };

  const logout = async () => {
    const savedUser = localStorage.getItem('google_user');
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;

    await logAuthSession({
      loginTimestamp: null,
      logoutTimestamp: new Date().toISOString(),
      userData: parsedUser,
      sessionId: parsedUser?.sessionId || crypto.randomUUID()
    });

    localStorage.removeItem('google_user');
    setUser(null);
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

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
            width: menuOpen ? '260px' : '80px',
            minHeight: '100vh',
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            padding: '24px 18px',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '28px',
              cursor: 'pointer',
              marginBottom: '30px'
            }}
          >
            ☰
          </button>

          {menuOpen && (
            <>
              <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>
                MySports
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
                    href="/sportkurse"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.12)',
                      fontWeight: 'bold'
                    }}
                  >
                    {t.sportCourses}
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
                    {t.sportCourses}
                  </div>
                )}
              </nav>
            </>
          )}
        </aside>

        <section
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            padding: '30px 20px',
            boxSizing: 'border-box',
            minWidth: '300px'
          }}
        >
          <div
            style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
              display: 'flex',
              gap: '10px'
            }}
          >
            {!user ? (
              <button
                onClick={signInWithGoogle}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#fff',
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
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#fff',
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
                padding: '10px 16px',
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

          <div style={{ maxWidth: '700px', textAlign: 'center', width: '100%' }}>
            <h1
              style={{
                fontSize: 'clamp(36px, 8vw, 56px)',
                marginBottom: '20px'
              }}
            >
              {t.title}
            </h1>

            <p
              style={{
                fontSize: 'clamp(16px, 4vw, 20px)',
                lineHeight: '1.6'
              }}
            >
              {t.subtitle}
            </p>

            {authError && (
              <div
                style={{
                  marginTop: '24px',
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'rgba(255,0,0,0.25)'
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
