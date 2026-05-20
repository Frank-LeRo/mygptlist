'use client';

import { useState } from 'react';

const pageSize = 20;

export default function LogsPage() {
  const [page, setPage] = useState(1);

  const hasMoreData = true;

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

      <p>
        Aktuelle Seite: {page}
      </p>

      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {hasMoreData && (
          <button
            onClick={() => setPage(page + 1)}
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
