import { supabase } from '../lib/supabase';

export default async function Home() {
  const { data: models, error } = await supabase
    .from('gptlist')
    .select('model, description')
    .order('model');

  return (
    <main
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <h1 style={{ fontSize: '42px' }}>GPT Liste</h1>
      <p>Modelle aus der Supabase Datenbank.</p>

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
          Fehler beim Laden der Daten: {error.message}
        </div>
      )}

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '30px',
          background: 'white',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
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
              Modell
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: '16px',
                borderBottom: '1px solid #ddd'
              }}
            >
              Beschreibung
            </th>
          </tr>
        </thead>
        <tbody>
          {models?.map((model) => (
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
    </main>
  );
}
