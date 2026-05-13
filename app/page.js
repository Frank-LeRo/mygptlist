const models = [
  {
    name: 'GPT-4o',
    description: 'Multimodales Modell für Text, Bild und Audio.'
  },
  {
    name: 'GPT-4.1',
    description: 'Stark bei Programmierung und komplexen Aufgaben.'
  },
  {
    name: 'GPT-4.1 Mini',
    description: 'Schnelleres und günstigeres Modell.'
  },
  {
    name: 'o3',
    description: 'Reasoning-Modell für tiefere Analysen.'
  },
  {
    name: 'o4-mini',
    description: 'Kompaktes Modell mit hoher Geschwindigkeit.'
  }
];

export default function Home() {
  return (
    <main
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px',
        fontFamily: 'Arial'
      }}
    >
      <h1 style={{ fontSize: '42px' }}>ChatGPT Sprachmodelle</h1>
      <p>Übersicht aktueller OpenAI Modelle.</p>

      <div style={{ marginTop: '30px' }}>
        {models.map((model) => (
          <div
            key={model.name}
            style={{
              background: 'white',
              borderRadius: '14px',
              padding: '24px',
              marginBottom: '18px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
          >
            <h2>{model.name}</h2>
            <p>{model.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
