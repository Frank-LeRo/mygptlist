'use client';

import { useEffect, useState } from 'react';

const pageSize = 20;

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMoreData, setHasMoreData] = useState(false);

  useEffect(() => {
    loadLogs(page);
  }, [page]);

  const loadLogs = async (currentPage) => {
    try {
      setLoading(true);
      setError('');

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setError('Supabase Konfiguration fehlt');
        return;
      }

      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/auth_session_logs?select=*&order=login_timestamp.desc&limit=${pageSize + 1}&offset=${from}`,
        {
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Logs konnten nicht geladen werden');
      }

      const data = await response.json();

      setHasMoreData(data.length > pageSize);
      setLogs(data.slice(0, pageSize));
    } catch (err) {
      console.error(err);
      setError('Fehler beim Laden der Logs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        background: '#111',
        color: '#fff'
      }}
    >
      <h1>Logs</h1>

      <p>Aktuelle Seite: {page}</p>

      {loading && <p>Logs werden geladen...</p>}

      {error && (
        <div
          style={{
            padding: '12px',
            borderRadius: '10px',
            background: 'rgba(255,0,0,0.2)',
            marginBottom: '20px'
          }}
        >
          {error}
        </div>
      )}

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px'
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px' }}>User</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>E-Mail</th>
            <th style={{ textAlign: 'left', padding: '12px' }}>Login</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td style={{ padding: '12px' }}>{log.user_name}</td>
              <td style={{ padding: '12px' }}>{log.user_mail}</td>
              <td style={{ padding: '12px' }}>
                {log.login_timestamp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            padding: '10px 16px',
            borderRadius: '10px',
            border: 'none',
            background: page === 1 ? '#666' : '#fff',
            color: '#111',
            cursor: page === 1 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          Vorherige Seite
        </button>

        {hasMoreData && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: 'none',
              background: '#fff',
              color: '#111',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Nächste Seite
          </button>
        )}
      </div>

      <p style={{ marginTop: '20px', opacity: 0.7 }}>
        Maximal {pageSize} Datensätze pro Seite.
      </p>
    </main>
  );
}
